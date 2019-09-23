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
    return response.recordset.map(({ UserFullName, User_ID, RoleType }) => ({
        userFullName: UserFullName,
        user_ID: User_ID,
        roleType: RoleType
    }))
}

const checkFolderExists = async (pool, folderPath) => {
    let response = await pool
        .request()
        .input('path', sql.NVarChar(255), folderPath).query(`select distinct
                    Folder_ID
                from Folders 
                    where 
                        FolderPath = @path`)

    return Boolean(response.recordset.length)
}

module.exports.getFolderOwners = getFolderOwners
module.exports.checkFolderExists = checkFolderExists
