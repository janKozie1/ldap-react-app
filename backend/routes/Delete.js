const router = require('express').Router()
const auth = require('../middleware/auth')
const sql = require('mssql')
const path = require('path')
const { config } = require('../../config')
const { readFileAsync } = require('../functions')

const { deleteUser, checkUserIsValid } = require('../queryFunctions/users')
const {
    checkFolderIsValid,
    deleteFolder
} = require('../queryFunctions/folders')
const {
    checkRelationIsValid,
    deleteRelation
} = require('../queryFunctions/relations')
const { deleteGroup, checkGroupIsValid } = require('../queryFunctions/groups')

router.post('/user', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { user_ID, userFullName } = req.body
        sql.close()
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let userExists = await checkUserIsValid(pool, user_ID, userFullName)
        if (!userExists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Użytkownik nie istnieje' })
        let ok = await deleteUser(pool, user_ID, userFullName)
        if (ok)
            return res
                .status(200)
                .json({ ok: true, msg: 'Użytkownik usunięty' })
        return res.status(500).json({ ok: false, msg: 'Błąd serwera' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

router.post('/group', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { group_ID, groupName } = req.body
        sql.close()
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let groupExists = await checkGroupIsValid(pool, group_ID, groupName)
        if (!groupExists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Grupa nie istnieje' })
        let ok = await deleteGroup(pool, group_ID, groupName)

        if (ok) return res.status(200).json({ ok: true, msg: 'Grupa usunięta' })
        return res.status(500).json({ ok: false, msg: 'Błąd serwera' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

router.post('/folder', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { folder_ID, folderPath } = req.body
        sql.close()
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let folderExists = await checkFolderIsValid(pool, folder_ID, folderPath)
        if (!folderExists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Folder nie istnieje' })
        let ok = await deleteFolder(pool, folder_ID, folderPath)

        if (ok)
            return res.status(200).json({ ok: true, msg: 'Folder usunięty' })
        return res.status(500).json({ ok: false, msg: 'Błąd serwera' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

router.post('/relation', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { folderPath, groupName, relation_ID } = req.body
        sql.close()
        let server = await readFileAsync(
            path.resolve(__dirname, '../db_ip.txt')
        )
        let pool = await sql.connect({ ...config.DB, server })
        let relationExists = await checkRelationIsValid(
            pool,
            relation_ID,
            folderPath,
            groupName
        )
        if (!relationExists)
            return res
                .status(400)
                .json({ ok: false, msg: 'Relacja nie istnieje' })

        let ok = await deleteRelation(pool, relation_ID)

        if (ok)
            return res.status(200).json({ ok: true, msg: 'Relacja usunięta' })
        return res.status(500).json({ ok: false, msg: 'Błąd serwera' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false })
    }
})

module.exports = router
