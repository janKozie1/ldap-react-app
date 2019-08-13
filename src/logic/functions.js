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
    return [...array.sort(sort)];
}

export let objectByArrayKey = (arr, obj, key) => {
    return arr.reduce((prev, curr) => {
        let localObj = { ...obj }
        prev[curr[key]] = localObj;
        return prev;
    }, {})
}

export let updateObject = (arr) =>{
    return arr.reduce((prev, curr) => {
        prev[curr[0]] = curr[1];
        return prev;
    }, {})
}



export let parseUserList = (userList) => {
    return userList.map((e,i)=>({...e,check:false,open:false}))
}


export let compareFetchedData = (prev, curr) => {
    return prev 
            && curr 
                && prev.length === curr.length 
                    && JSON.stringify(prev.map(e => e.ID).sort()) === JSON.stringify(curr.map(e => e.ID).sort())
}

export let createCSVTable = (data) => {
    let createDataRow = (args) => {
        return args.map(e => e ? `"${e}"`: '').join(";") + '\n';
    }
    let getUserString = (user) => {
        return user ? `${user.description} - ${user.cn}` : '';
    }
    return (data.filter(e => e.check).reduce((prev, {path,members,owners}) => {
        let longer = owners.length >= members.length ? owners : members;
        return prev + createDataRow(
                [
                    path,
                    getUserString(members[0]),
                    getUserString(owners[0])
                ]
                ).concat (longer.map((e,i)=>{
                        return createDataRow(
                            [
                                '',
                                getUserString(owners[i]),
                                getUserString(members[i])
                            ]
                            )
                        }).join(""),
                            '"";"";""\n'
                        );
       
    }, 'Sciezka;Wlasciciele;Czlonkowie\n'))
}