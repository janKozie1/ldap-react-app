const sql = require('mssql')

const checkRelationExists = async (pool, folder_ID, group_ID) => {
    let response = await pool
        .request()
        .input('folderID', sql.Int, folder_ID)
        .input('groupID', sql.Int, group_ID)
        .query(
            `select * from dbo.Relations where Folder_ID = @folderID and Group_ID = @groupID`
        )
    return Boolean(response.recordset.length)
}

const getAllRelations = async pool => {
    let response = await pool
        .request()
        .query(
            `select r.Relation_ID as relation_ID, g.GroupName as groupName, f.FolderPath as folderPath from Relations r join Folders f on r.Folder_ID = f.Folder_Id join Groups g on g.Group_ID = r.Group_ID`
        )
    return response.recordset
}

const checkRelationIsValid = async (
    pool,
    relation_ID,
    folderPath,
    groupName
) => {
    let response = await pool
        .request()
        .input('relationID', sql.Int, relation_ID)
        .input('folderPath', sql.NVarChar(255), folderPath)
        .input('groupName', sql.NVarChar(127), groupName)
        .query(
            `select * from Relations r join Folders f on r.Folder_ID = f.Folder_Id join Groups g on g.Group_ID = r.Group_ID where r.relation_ID = @relationID and f.FolderPath = @folderPath and g.GroupName = @groupName`
        )
    return Boolean(response.recordset.length)
}

const deleteRelation = async (pool, relation_ID) => {
    let response = await pool
        .request()
        .input('relationID', sql.Int, relation_ID)
        .query(`delete from dbo.Relations where Relation_ID = @relationID`)
    return Boolean(response.rowsAffected[0])
}

module.exports.checkRelationExists = checkRelationExists
module.exports.getAllRelations = getAllRelations
module.exports.checkRelationIsValid = checkRelationIsValid
module.exports.deleteRelation = deleteRelation
