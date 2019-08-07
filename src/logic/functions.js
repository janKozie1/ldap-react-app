export let checkResponseStatus = (res) => {
    if (res.ok) {
        return res;
    } else {
        throw Error(res.statusText)
    }
}


export let sortByKey = (array, key, dir = 0) => {
    let sort = (a, b) => {
        if (typeof a[key] === typeof b[key] && typeof b[key] !== 'undefined') {
            if (typeof a[key] === 'string') {
                if (a[key].toUpperCase() < b[key].toUpperCase()) {
                    return dir ? 1 : - 1;
                } else if (a[key].toUpperCase() > b[key].toUpperCase()) {
                    return dir ? -1 : 1;
                }
            } else if (typeof a[key] === 'number') {
                return dir ? b[key] - a[key] : a[key] - b[key]

            }
        }
        return 0;
    }
    return array.sort(sort);
}

export let arrToObject = (arr, obj , key ) => {
    console.log("?")
    return arr.reduce((prev, curr) => {
        let localObj = {...obj}
        prev[curr[key]]  = localObj;
        return prev;
    }, {})
}