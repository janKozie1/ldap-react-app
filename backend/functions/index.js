const fs = require('fs')
const ActiveDirectory = require('activedirectory')
const { config } = require('../../config')
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
    let response = []
    let baseQuery = 'select ID, Grupa, Description  from dbo.Klucze where'
    if (type === 'id') {
        response = await pool
            .request()
            .input('userID', sql.NVarChar(255), query)
            .query(`${baseQuery} [User ID] = @userID`)
    } else if ((type = 'fullName')) {
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
    }
    return response.recordset.length
        ? response.recordset
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
        : []
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
    return response.recordset.length
        ? response.recordset
              .map(({ Name, cn, Access }) => {
                  return {
                      description: Name,
                      cn,
                      Access
                  }
              })
              .filter(e => e.cn && e.description)
        : []
}

let getGroupMemembers = group => {
    let ad = new ActiveDirectory(config.AD)
    return new Promise((resolve, reject) => {
        ad.getUsersForGroup(group, (err, res) => {
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

module.exports.readFileAsync = readFileAsync
module.exports.getGroupMemembers = getGroupMemembers
module.exports.getGroupOwnersFromDB = getGroupOwnersFromDB
module.exports.determineGroupType = determineGroupType
module.exports.getFolderInfoFromDB = getFolderInfoFromDB
