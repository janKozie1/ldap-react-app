const router = require('express').Router()
const auth = require('../middleware/auth')
const sql = require('mssql')
const path = require('path')
const { config } = require('../../config')
const { readFileAsync, capitalize } = require('../functions')
const {
    updateOwners,
    addNewUser,
    addNewFolder
} = require('../queryFunctions/update')
const { checkUserExists } = require('../queryFunctions/users')
const { checkFolderExists } = require('../queryFunctions/folders')
const { checkRelationExists } = require('../queryFunctions/relations')
router.put('/', auth, async (req, res) => {
    if (req.body.owners) {
        try {
            sql.close()
            let server = await readFileAsync(
                path.resolve(__dirname, '../db_ip.txt')
            )
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
        const { userID, firstName, surname, office } = req.body

        sql.close()

        if (!/^[a-zA-Z]{1,2}\d{5,7}$/.test(userID))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne ID' })
        if (!/[a-zA-Z]{3,}/.test(firstName))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne imię' })
        if (!/[a-zA-Z]{3,}/.test(surname))
            return res
                .status(400)
                .json({ ok: false, msg: 'Niepoprawne nazwisko' })
        if (!/[a-zA-Z]{5,}/.test(office))
            return res.status(400).json({ ok: false, msg: 'Niepoprawne biuro' })

        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let exists = await checkUserExists(pool, userID)
        const fullName = `${capitalize(surname)} ${capitalize(firstName)}`
        if (exists)
            return res.status(400).json({ ok: false, msg: 'ID już w użyciu' })

        let ok = await addNewUser(pool, {
            userID: userID.toUpperCase(),
            fullName,
            userOffice: office.toLowerCase()
        })
        if (ok) return res.json({ ok: true, msg: 'Użytkownik dodany' })
        return res.status(500).json({ ok: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

router.post('/add/folder', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { folderPath, location } = req.body

        sql.close()
        if (!/^[\\\/]{2,}/.test(folderPath))
            return res
                .status(400)
                .json({ ok: false, msg: 'Niepoprawna ścieżka' })
        if (!/[a-zA-Z]{3,}/.test(location))
            return res
                .status(400)
                .json({ ok: false, msg: 'Niepoprawna lokalizacja' })
        console.log(path.resolve)
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let exists = await checkFolderExists(pool, folderPath)
        if (exists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Ścieżka już w użyciu' })

        let ok = await addNewFolder(pool, {
            folderPath,
            location
        })
        if (ok) return res.json({ ok: true, msg: 'Folder dodany' })
        return res.status(500).json({ ok: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

router.post('/add/relation', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { folder, group } = req.body

        sql.close()
        if (!folder || !folder.folder_ID || !folder.folderPath)
            return res
                .status(400)
                .json({ ok: false, msg: 'Niepoprawny folder' })
        if (!group || !group.group_ID || group.groupName)
            return res.status(400).json({ ok: false, msg: 'Niepoprawna grupa' })

        const { folder_ID } = folder
        const { group_ID } = group
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let exists = await checkRelationExists(pool, folder_ID, group_ID)
        if (exists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Powiązanie już istnieje' })

        let ok = await addNewRelation(pool)
        if (ok) return res.json({ ok: true, msg: 'Powiązanie dodane' })
        return res.status(500).json({ ok: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

module.exports = router
