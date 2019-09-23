const sql = require('mssql')
const { capitalize } = require('../functions')
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

const addNewUser = async (pool, user) => {
    try {
        await pool
            .request()
            .input('user_ID', sql.VarChar(15), user.userID)
            .input('name', sql.NVarChar(255), user.fullName)
            .input('office', sql.NVarChar(40), user.userOffice)
            .query(
                `insert into dbo.Users (User_ID,UserFullName,UserOffice) values (@user_ID,@name,@office)`
            )
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const addNewFolder = async (pool, folder) => {
    try {
        await pool
            .request()
            .input('path', sql.VarChar(255), folder.folderPath)
            .input('location', sql.NVarChar(31), folder.location)
            .query(
                `insert into dbo.Folders (FolderPath, FolderLocation) values (@path,@location)`
            )
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
module.exports.updateOwners = updateOwners
module.exports.addNewUser = addNewUser
module.exports.addNewFolder = addNewFolder
