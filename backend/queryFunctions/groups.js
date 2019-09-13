const { ad } = require('../isntances')
const sql = require('mssql')

const BASE_GROUP_QUERY = `
    select distinct
        g.GroupName,
        g.Group_ID,
        f.FolderPath
    from Groups g 
        join Folders f on 
            f.Folder_ID = g.Folder_ID 
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
        .query(`${BASE_GROUP_QUERY} f.FolderPath like @path`)

    return parseGroupResults(response.recordset)
}

const getMatchingGroups = async (pool, query) => {
    let response = await pool
        .request()
        .input('group', sql.NVarChar(255), `%${query}%`)
        .query(`${BASE_GROUP_QUERY} g.GroupName like @group`)
    return parseGroupResults(response.recordset)
}

module.exports.getGroupsForPath = getGroupsForPath
module.exports.getMatchingGroups = getMatchingGroups
