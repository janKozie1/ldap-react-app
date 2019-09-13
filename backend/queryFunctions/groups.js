const { ad } = require('../isntances')
const sql = require('mssql')
const { parsePolish } = require('../functions')

const BASE_GROUP_QUERY_PATH_OR_GROUP = `
    select distinct
        g.GroupName,
        g.Group_ID,
        f.FolderPath
    from Groups g 
        join Folders f on 
            f.Folder_ID = g.Folder_ID 
        where
`

const BASE_GROUP_QUERY_NAME_OR_ID = `
    select distinct
        g.GroupName, 
        g.Group_ID, 
        f.FolderPath 
    from Groups g 
        join Folders f on 
            f.Folder_ID = g.Folder_ID 
        join Roles r on 
            r.Folder_ID = g.Folder_ID 
        join Users u on 
            r.User_ID = u.User_ID 
        where 
`

const getGroupMembers = group => {
    return new Promise((resolve, reject) => {
        ad.getUsersForGroup(group, (err, res) => {
            if (err) reject(err)

            let parsed = res
                ? res.map(({ cn, displayName, description }) => {
                      return {
                          cn,
                          displayName,
                          description
                      }
                  })
                : []
            resolve(parsed)
        })
    })
}

const parseGroupResults = groups => {
    return Promise.all(
        groups.map(async ({ GroupName, Group_ID, FolderPath }) => {
            let members = await getGroupMembers(GroupName)
            return {
                groupName: GroupName,
                group_ID: Group_ID,
                folderPath: FolderPath,
                members,
                memberCount: members.length
            }
        })
    ).then(data => data)
}

const getGroupsForPath = async (pool, query) => {
    let response = await pool
        .request()
        .input('path', sql.NVarChar(255), `%${query}%`)
        .query(`${BASE_GROUP_QUERY_PATH_OR_GROUP} f.FolderPath like @path`)

    return parseGroupResults(response.recordset)
}

const getMatchingGroups = async (pool, query) => {
    let response = await pool
        .request()
        .input('group', sql.NVarChar(255), `%${query}%`)
        .query(`${BASE_GROUP_QUERY_PATH_OR_GROUP} g.GroupName like @group`)
    return parseGroupResults(response.recordset)
}

const getGroupsByUserID = async (pool, query) => {
    let response = await pool
        .request()
        .input('id', sql.NVarChar(255), query.toUpperCase())
        .query(`${BASE_GROUP_QUERY_NAME_OR_ID} u.User_ID like @id`)
    return parseGroupResults(response.recordset)
}

const getGroupsByUserFullName = async (pool, query) => {
    let response = await pool
        .request()
        .input('name', sql.NVarChar(255), parsePolish(query))
        .input(
            'reversedName',
            sql.NVarChar(255),
            parsePolish(
                query
                    .split(' ')
                    .reverse()
                    .join(' ')
            )
        )
        .query(
            `${BASE_GROUP_QUERY_NAME_OR_ID} dbo.parse(u.UserFullName) like @name or dbo.parse(u.UserFullName) like @reversedName`
        )
    return parseGroupResults(response.recordset)
}

module.exports.getGroupsForPath = getGroupsForPath
module.exports.getMatchingGroups = getMatchingGroups
module.exports.getGroupsByUserID = getGroupsByUserID
module.exports.getGroupsByUserFullName = getGroupsByUserFullName
