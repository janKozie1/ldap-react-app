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
const getAllFolders = async pool => {
    let response = await pool
        .request()
        .query(
            `select Folder_ID as folder_ID, FolderPath as folderPath from dbo.Folders`
        )
    return response.recordset
}

module.exports.getFolderOwners = getFolderOwners
module.exports.checkFolderExists = checkFolderExists
module.exports.getAllFolders = getAllFolders
