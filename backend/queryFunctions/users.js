const getAllUsers = async pool => {
    let response = await pool
        .request()
        .query(
            `select User_ID as user_ID, UserFullName as userFullName from dbo.Users order by userFullName `
        )
    return response.recordset
}

module.exports.getAllUsers = getAllUsers
