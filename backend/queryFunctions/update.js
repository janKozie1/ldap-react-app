const sql = require('mssql')

const updateOwners = async (pool, data) => {
    try {
        await pool
            .request()
            .input('folder_ID', sql.NVarChar(255), data.folder_ID)
            .query(`delete from dbo.Roles where Folder_ID = @folder_ID`)
        data.owners.forEach(async e => {
            await pool
                .request()
                .input('roletype', sql.VarChar(127), e.roleType)
                .input('user_id', sql.VarChar(127), e.user_ID)
                .input('folder_id', sql.VarChar(127), data.folder_ID)
                .query(
                    `insert into dbo.Roles (RoleType,User_ID,Folder_ID) values (@roletype,@user_id,@folder_id)`
                )
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports.updateOwners = updateOwners
