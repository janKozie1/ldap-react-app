const fs = require('fs')
const { ad } = require('../isntances')
const sql = require('mssql')

let parsePolish = string => {
    let pl = new Map([
        ['ą', 'a'],
        ['ę', 'e'],
        ['ć', 'c'],
        ['ń', 'n'],
        ['ż', 'z'],
        ['ź', 'z'],
        ['ó', 'o'],
        ['ó', 'o'],
        ['ś', 's'],
        ['ł', 'l']
    ])
    return string
        .split('')
        .map(e => pl.get(e) || e)
        .join('')
}

let getFolderInfoFromDB = async (pool, query, type) => {
    try {
        let response = []
        let baseQuery = 'select ID, Grupa, Description  from dbo.Klucze where'
        if (type === 'id') {
            response = await pool
                .request()
                .input('userID', sql.NVarChar(255), query)
                .query(`${baseQuery} [User ID] = @userID`)
        } else if (type === 'fullName') {
            response = await pool
                .request()
                .input('name', sql.NVarChar(255), parsePolish(query))
                .input(
                    'reversedName',
                    sql.NVarChar(255),
                    parsePolish(
                        query
                            .split(' ')
                            .reverse()
                            .join(' ')
                    )
                )
                .query(
                    `${baseQuery} dbo.parse(Name) LIKE @name or  dbo.parse(Name) LIKE @reversedName`
                )
        } else if (type === 'path') {
            response = await pool
                .request()
                .input('path', sql.NVarChar(255), `%${query}%`)
                .query(`${baseQuery} Description LIKE @path`)
        } else if (type === 'group') {
            response = await pool
                .request()
                .input('group', sql.NVarChar(255), `%${query}%`)
                .query(`${baseQuery} Grupa LIKE @group`)
        }
        return response.recordset
            .map(({ Grupa, Description, ID }) => {
                return {
                    group: Grupa,
                    groupType: determineGroupType(Grupa),
                    path: Description,
                    ID,
                    members: []
                }
            })
            .filter(e => e.group && e.path)
    } catch (err) {
        return err
    }
}

let determineGroupType = name => {
    let unparsed = name.split('_')
    if (
        unparsed[unparsed.length - 1] === 'C' ||
        unparsed[unparsed.length - 1] === 'R'
    ) {
        return unparsed[unparsed.length - 1]
    }
    return ''
}

let getGroupOwnersFromDB = async (pool, group, path) => {
    let response = []
    response = await pool
        .request()
        .input('group', sql.NVarChar(255), group)
        .input('path', sql.NVarChar(255), path)
        .query(
            'select Name, [User ID] as cn, Access from dbo.Klucze where Grupa=@group AND Description=@path'
        )
    return response.recordset
        .map(({ Name, cn, Access }) => {
            return {
                description: Name,
                cn,
                Access
            }
        })
        .filter(e => e.cn && e.description)
}

let getGroupMemembers = group => {
    return new Promise((resolve, reject) => {
        ad.getUsersForGroup(group, (err, res) => {
            if (err) reject(err)
            let parsed = res
                ? res.map(({ cn, displayName, description }) => {
                      return {
                          cn,
                          displayName,
                          description
                      }
                  })
                : []
            resolve(parsed)
        })
    })
}

let readFileAsync = filename => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

let isGroupMemberAsync = (username, group) => {
    return new Promise((resolve, reject) => {
        ad.isUserMemberOf(username, group, (err, isMember) => {
            if (err) reject('Błąd servera')
            resolve(isMember)
        })
    })
}

let authenticateAdAsync = (username, password) => {
    return new Promise(resolve => {
        ad.authenticate(username, password, (err, auth) => {
            if (err) resolve(false)
            resolve(auth)
        })
    })
}

module.exports.readFileAsync = readFileAsync
module.exports.getGroupMemembers = getGroupMemembers
module.exports.getGroupOwnersFromDB = getGroupOwnersFromDB
module.exports.determineGroupType = determineGroupType
module.exports.getFolderInfoFromDB = getFolderInfoFromDB
module.exports.isGroupMemberAsync = isGroupMemberAsync
module.exports.authenticateAdAsync = authenticateAdAsync
