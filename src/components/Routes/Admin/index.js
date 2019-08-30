import React from 'react'
import withProtectedRoute from '../../HOC/ProtectedRoute'
let Admin = () => {
    return <p>Admin</p>
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
