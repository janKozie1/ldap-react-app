import { fetchDefConfig } from '../../../constants/defaultVariables'
export let compareFetchedData = (prev, curr) => {
    return (
        prev &&
        curr &&
        prev.length === curr.length &&
        JSON.stringify(prev.map(e => e.ID).sort()) ===
            JSON.stringify(curr.map(e => e.ID).sort())
    )
}

export let checkResponseStatus = res => {
    if (res.ok) {
        return res
    } else {
        throw Error(res.statusText)
    }
}

export let checkIfAuthorized = async token => {
    try {
        console.log('?')
        let res = await fetch(`${fetchDefConfig.BASE_URL}/admin/auth`, {
            method: 'POST',
            headers: {
                'x-auth-token': token
            }
        })
        if (!res.ok) throw Error
        let parsed = await res.json()
        return parsed.authorized
    } catch (err) {
        return false
    }
}
