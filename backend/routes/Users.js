const router = require('express').Router()
let { config } = require('../../config')
const sql = require('mssql')

const { readFileAsync, determineGroupType } = require('../functions')

const {
    getGroupsForPath,
    getMatchingGroups,
    getGroupsByUserID,
    getGroupsByUserFullName
} = require('../queryFunctions/groups')

const { getFolderOwners } = require('../queryFunctions/folders')

router.post('/data', async (req, res) => {
    if (req.body.query && req.body.type) {
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let groups = await (async type => {
                const { query } = req.body
                switch (type) {
                    case 'id':
                        return await getGroupsByUserID(pool, query)
                    case 'fullName':
                        return await getGroupsByUserFullName(pool, query)
                    case 'path':
                        return await getGroupsForPath(pool, query)
                    case 'group':
                        return await getMatchingGroups(pool, query)
                }
            })(req.body.type)

            let groupsAndOwners = groups.map(async e => {
                let owners = await getFolderOwners(pool, e.folderPath)
                return {
                    ...e,
                    groupType: determineGroupType(e.groupName),
                    owners,
                    ownersCount: owners.length
                }
            })
            Promise.all(groupsAndOwners).then(data => {
                sql.close()
                console.log('response', (Date.now() - temp) / 1000)
                return res.json(data)
            })
        } catch (err) {
            console.error(err)
        }
    } else return res.status(400).send('Invalid query')
})

module.exports = router
