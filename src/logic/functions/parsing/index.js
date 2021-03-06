export let sortByKey = (array, key, dir = 0) => {
    let sort = (a, b) => {
        if (typeof a[key] === typeof b[key] && typeof b[key] !== 'undefined') {
            if (typeof a[key] === 'string') {
                if (a[key].toUpperCase() < b[key].toUpperCase()) {
                    return dir ? 1 : -1
                } else if (a[key].toUpperCase() > b[key].toUpperCase()) {
                    return dir ? -1 : 1
                }
            } else if (typeof a[key] === 'number') {
                return dir ? b[key] - a[key] : a[key] - b[key]
            }
        }
        return 0
    }
    return [...array.sort(sort)]
}

export let objectByArrayKey = (arr, obj, key) => {
    return arr.reduce((prev, curr) => {
        let localObj = { ...obj }
        prev[curr[key]] = localObj
        return prev
    }, {})
}

export let updateObject = arr => {
    return arr.reduce((prev, curr) => {
        prev[curr[0]] = curr[1]
        return prev
    }, {})
}

export let parseUserList = userList => {
    return userList.map(e => ({ ...e, check: false, open: false }))
}

export let sortData = data => {
    return parseUserList(
        data.map(e => ({
            ...e,
            members: sortByKey(e.members, 'description'),
            owners: sortByKey(e.owners, 'description')
        }))
    )
}
