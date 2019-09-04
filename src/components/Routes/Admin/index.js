import React from 'react'
import withProtectedRoute from '../../HOC/ProtectedRoute'
let Admin = props => {
    return (
        <p>
            <button onClick={() => props.history.push('/login')}>a</button>
        </p>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
