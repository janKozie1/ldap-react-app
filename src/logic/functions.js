export let checkResponseStatus = (res) => {
    if(res.ok){
        return res;
    }else{
        throw Error(res.statusText)
    }
}


export let sortStrings = (array,key) => {
    let sort = (a,b) => {
        if(a[key] < b[key]){
            return -1;
        }else if( a[key] > b[key]){
            return 1;
        }
        return 0;
    }
    return array.sort(sort)
}