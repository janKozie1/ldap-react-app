export let checkResponseStatus = (res) => {
    if(res.ok){
        return res;
    }else{
        throw Error(res.statusText)
    }
}

