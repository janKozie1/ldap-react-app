import React, { useEffect } from 'react'
import { useStateValue } from '../../logic/store'
import { checkIfAuthorized } from '../../logic/functions/network'
const withProtectedRoute = Wrapped => props => {
    let [{ token }, dispatch] = useStateValue()
    token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibjk5MDM3IiwiaWF0IjoxNTY2OTk1OTYyfQ.h-mLJJFOWTHyZmRcmhrsSKoV7lgIBivQCyRUHVGv8yg'

    useEffect(() => {
        let a = async () => {
            return await checkIfAuthorized(token)
        }
        console.log(a())

        props.history.push('/')
    }, [])

    return <Wrapped {...props} />
}

export default withProtectedRoute
