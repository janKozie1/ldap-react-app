const fs = require('fs')
const { ad } = require('../isntances')
const sql = require('mssql')

const getFolderOwners = async (pool, path) => {
    let response = await pool.request().input('path', sql.NVarChar(255), path)
        .query(`select distinct
                    u.UserFullName,
                    u.User_ID,
                    r.RoleType
                from Users u 
                    join Roles r on 
                        r.User_ID = u.User_ID
                    join Folders f on
                        f.Folder_ID = r.Folder_ID
                    where 
                        f.FolderPath = @path`)
    return response.recordset
}

module.exports.getFolderOwners = getFolderOwners
