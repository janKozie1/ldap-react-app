const router = require('express').Router()
const auth = require('../middleware/auth')
const sql = require('mssql')

const { config } = require('../../config')
const { readFileAsync, capitalize } = require('../functions')
const { updateOwners, addNewUser } = require('../queryFunctions/update')
const { checkUserExists } = require('../queryFunctions/users')

router.put('/', auth, async (req, res) => {
    if (req.body.owners) {
        try {
            sql.close()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let completed = await updateOwners(pool, req.body)
            if (completed) {
                return res
                    .status(200)
                    .json({ ok: true, msg: 'Zmiany zapisane' })
            } else {
                res.status(500).json({ ok: false })
            }
        } catch (err) {
            console.error(err)
        }
    } else {
        return res.status(400).send([{ err: 'Invalid query' }])
    }
})

router.post('/add/user', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { userID, userName, userOffice } = req.body
        const fullName = `${capitalize(userName.surname)} ${capitalize(
            userName.firstName
        )}`
        sql.close()

        if (!/^[a-zA-Z]{1,2}\d{5,7}$/.test(userID))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne ID' })
        if (!/[a-zA-Z]{3,}/.test(userName.firstName))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne imię' })
        if (!/[a-zA-Z]{3,}/.test(userName.surname))
            return res
                .status(400)
                .json({ ok: false, msg: 'Niepoprawne nazwisko' })
        if (!/[a-zA-Z]{5,}/.test(userOffice))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne biuro' })

        let server = await readFileAsync('../db_ip.txt')
        let pool = await sql.connect({ ...config.DB, server })
        let exists = await checkUserExists(pool, userID)

        if (exists)
            return res.status(400).json({ ok: false, msg: 'ID już w użyciu' })

        let ok = await addNewUser(pool, {
            userID: userID.toUpperCase(),
            fullName,
            userOffice: userOffice.toLowerCase()
        })
        if (ok) return res.json({ ok: true, msg: 'Użytkownik dodany' })
        return res.status(500).json({ ok: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

module.exports = router
