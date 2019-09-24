const { ad } = require('../isntances')
const sql = require('mssql')
const { parsePolish } = require('../functions')

const BASE_GROUP_QUERY_PATH_OR_GROUP = `
    select distinct
        g.GroupName,
        g.Group_ID,
        f.Folder_ID,
        f.FolderPath
    from Groups g 
        join Relations r on 
            r.Group_ID = g.Group_ID 
        join Folders f on 
            f.Folder_ID = r.Folder_ID
        where
`

const BASE_GROUP_QUERY_NAME_OR_ID = `
    select distinct
        g.GroupName, 
        g.Group_ID,
        f.Folder_ID, 
        f.FolderPath 
    from Groups g 
        join Relations re on 
            re.Group_ID = g.Group_ID 
        join Folders f on 
            f.Folder_ID = re.Folder_ID
        join Roles r on 
            r.Folder_ID = re.Folder_ID 
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
        groups.map(async ({ GroupName, Group_ID, FolderPath, Folder_ID }) => {
            let members = await getGroupMembers(GroupName)
            return {
                groupName: GroupName,
                group_ID: Group_ID,
                folderPath: FolderPath,
                folder_ID: Folder_ID,
                members,
                membersCount: members.length
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

const getAllGroups = async pool => {
    let response = await pool
        .request()
        .query(
            `select Group_ID as group_ID, GroupName as groupName from dbo.Groups`
        )
    return response.recordset
}

const checkGroupExists = async (pool, group) => {
    let response = await pool
        .request()
        .input('group', sql.VarChar(127), group)
        .query(`select * from Groups where GroupName like @group`)
    return Boolean(response.recordset.length)
}

const checkGroupIsValid = async (pool, group_ID, groupName) => {
    let response = await pool
        .request()
        .input('groupName', sql.VarChar(127), groupName)
        .input('groupID', sql.Int, group_ID)
        .query(
            `select * from Groups where GroupName = @groupName and Group_ID = @groupID`
        )
    return Boolean(response.recordset.length)
}
const deleteGroup = async (pool, group_ID, groupName) => {
    await pool
        .request()
        .input('groupID', sql.Int, group_ID)
        .query(`delete from dbo.Relations where Group_ID = @groupID`)
    let response = await pool
        .request()
        .input('groupID', sql.Int, group_ID)
        .input('groupName', sql.VarChar(127), groupName)
        .query(
            `delete from dbo.Groups where Group_ID = @groupID and GroupName = @groupName`
        )
    return Boolean(response.rowsAffected[0])
}

module.exports.getGroupsForPath = getGroupsForPath
module.exports.getMatchingGroups = getMatchingGroups
module.exports.getGroupsByUserID = getGroupsByUserID
module.exports.getGroupsByUserFullName = getGroupsByUserFullName
module.exports.getAllGroups = getAllGroups
module.exports.checkGroupExists = checkGroupExists
module.exports.checkGroupIsValid = checkGroupIsValid
module.exports.deleteGroup = deleteGroup
