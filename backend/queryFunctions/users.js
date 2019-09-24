const sql = require('mssql')

const getAllUsers = async pool => {
    let response = await pool
        .request()
        .query(
            `select User_ID as user_ID, UserFullName as userFullName from dbo.Users order by userFullName `
        )
    return response.recordset
}

const checkUserExists = async (pool, userID) => {
    let response = await pool
        .request()
        .input('user_id', sql.VarChar(15), userID)
        .query(`select * from dbo.Users where User_ID = @user_id`)
    console.log(response.recordset)
    return Boolean(response.recordset.length)
}

const checkUserIsValid = async (pool, userID, userFullName) => {
    console.log(userID, userFullName)
    let response = await pool
        .request()
        .input('user_id', sql.VarChar(15), userID)
        .input('userFullName', sql.NVarChar(15), userFullName)
        .query(
            `select * from dbo.Users where User_ID = @user_id and UserFullName = @userFullName`
        )
    console.log(response)
    return Boolean(response.recordset.length)
}

const deleteUser = async (pool, userID, userFullName) => {
    await pool
        .request()
        .input('user_id', sql.VarChar(15), userID)
        .query(`delete from dbo.Roles where User_ID = @user_id`)
    let response = await pool
        .request()
        .input('user_id', sql.VarChar(15), userID)
        .input('userFullName', sql.NVarChar(15), userFullName)
        .query(
            `delete from dbo.Users where User_ID = @user_id and UserFullName = @userFullName`
        )
    return Boolean(response.rowsAffected[0])
}

module.exports.getAllUsers = getAllUsers
module.exports.checkUserExists = checkUserExists
module.exports.deleteUser = deleteUser
module.exports.checkUserIsValid = checkUserIsValid
