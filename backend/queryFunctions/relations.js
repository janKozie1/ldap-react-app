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

module.exports.checkRelationExists = checkRelationExists
