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

module.exports.getAllUsers = getAllUsers
module.exports.checkUserExists = checkUserExists
