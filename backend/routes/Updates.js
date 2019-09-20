const router = require('express').Router()
const auth = require('../middleware/auth')
const sql = require('mssql')
const { config } = require('../../config')
const { readFileAsync } = require('../functions')
const { updateOwners } = require('../queryFunctions/update')

router.put('/', auth, async (req, res) => {
    if (req.body.owners) {
        try {
            sql.close()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let completed = await updateOwners(pool, req.body)
            if (completed) {
                return res.status(200).json({ ok: true })
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

module.exports = router
