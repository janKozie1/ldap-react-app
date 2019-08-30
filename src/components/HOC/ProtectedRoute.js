import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../logic/store'
import { checkIfAuthorized } from '../../logic/functions/network'

const withProtectedRoute = ({
    protectedRoute,
    redirectTo
}) => Wrapped => props => {
    let [verified, setVerified] = useState(false)
    let [{ token }] = useStateValue()
    useEffect(() => {
        let checkToken = async token => {
            let res = await checkIfAuthorized(token)
            if ((res && !protectedRoute) || (!res && protectedRoute))
                props.history.push(redirectTo)
            else setVerified(true)
        }
        checkToken(token)
    }, [])
    return verified && <Wrapped {...props} />
}

export default withProtectedRoute
