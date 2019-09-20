const fs = require('fs')
const { ad } = require('../isntances')

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
    console.log(string)
    return string
        .split('')
        .map(e => pl.get(e) || e)
        .join('')
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
let capitalize = string => string[0].toUpperCase() + string.slice(1)

module.exports.readFileAsync = readFileAsync
module.exports.parsePolish = parsePolish
module.exports.determineGroupType = determineGroupType
module.exports.isGroupMemberAsync = isGroupMemberAsync
module.exports.authenticateAdAsync = authenticateAdAsync
module.exports.capitalize = capitalize
