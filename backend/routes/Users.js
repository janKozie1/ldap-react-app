const router = require('express').Router()
let { config } = require('../../config')
const sql = require('mssql')

const {
    readFileAsync,
    getFolderInfoFromDB,
    getGroupMemembers,
    getGroupOwnersFromDB
} = require('../functions')

router.post('/data', async (req, res) => {
    if (req.body.query && req.body.type)
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let folderInfo = await getFolderInfoFromDB(
                pool,
                req.body.query,
                req.body.type
            )

            let results = folderInfo.map(async e => {
                let members = await getGroupMemembers(e.group)
                let owners = await getGroupOwnersFromDB(pool, e.group, e.path)
                return {
                    ...e,
                    members,
                    owners,
                    ownersCount: owners.length,
                    membersCount: members.length
                }
            })
            Promise.all(results).then(data => {
                sql.close()
                console.log('response', (Date.now() - temp) / 1000)
                return res.json(data)
            })
        } catch (err) {
            console.log(err, '----------------')
        }
    else return res.status(400).send('Invalid query')
})

module.exports = router
