const router = require('express').Router()
let { config } = require('../../config')
const sql = require('mssql')

const {
    readFileAsync,
    getFolderInfoFromDB,
    getGroupMemembers,
    getGroupOwnersFromDB,
    determineGroupType
} = require('../functions')

const {
    getGroupsForPath,
    getMatchingGroups,
    getGroupsByUserID,
    getGroupsByUserFullName
} = require('../queryFunctions/groups')
const { getFolderOwners } = require('../queryFunctions/folders')

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

//  /users/data/path
//  PUBLIC
//  Get groupName,folderPath,members,owners by full or by a fragment of the folder's path

router.post('/data/path', async (req, res) => {
    if (req.body.query) {
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let groups = await getGroupsForPath(pool, req.body.query)
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

//  /users/data/group
//  PUBLIC
//  Get groupName,folderPath,members,owners by full or by a fragment of the group's name

router.post('/data/group', async (req, res) => {
    if (req.body.query) {
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let groups = await getMatchingGroups(pool, req.body.query)
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
            res.send(err)
        }
    } else return res.status(400).send('Invalid query')
})

//  /users/data/id
//  PUBLIC
//  Get groupName,folderPath,members,owners by full or by user's id

router.post('/data/id', async (req, res) => {
    if (req.body.query) {
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let groups = await getGroupsByUserID(pool, req.body.query)
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
            res.send(err)
        }
    } else return res.status(400).send('Invalid query')
})

router.post('/data/name', async (req, res) => {
    if (req.body.query) {
        try {
            sql.close()
            let temp = Date.now()
            let server = await readFileAsync('../db_ip.txt')
            let pool = await sql.connect({ ...config.DB, server })
            let groups = await getGroupsByUserFullName(pool, req.body.query)
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
            res.send(err)
        }
    } else return res.status(400).send('Invalid query')
})

module.exports = router
