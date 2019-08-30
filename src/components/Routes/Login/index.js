import React from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'

const Login = () => {
    return <div>Login</div>
}

export default withProtectedRoute({
    protectedRoute: false,
    redirectTo: '/admin'
})(Login)
