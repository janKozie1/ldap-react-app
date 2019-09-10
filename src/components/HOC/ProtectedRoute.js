import React, { useState } from 'react'
import { useStateValue } from '../../logic/store'
import { checkIfAuthorized } from '../../logic/functions/network'

const withProtectedRoute = ({
    protectedRoute,
    redirectTo
}) => Wrapped => props => {
    let [isAuthorized, setIsAuthorized] = useState(false)
    let [{ token }] = useStateValue()
    let checkToken = async token => {
        let res = await checkIfAuthorized(token)
        if ((res && !protectedRoute) || (!res && protectedRoute))
            props.history.push(redirectTo)
        else setIsAuthorized(true)
    }
    checkToken(token)

    return isAuthorized && <Wrapped {...props} />
}

export default withProtectedRoute
