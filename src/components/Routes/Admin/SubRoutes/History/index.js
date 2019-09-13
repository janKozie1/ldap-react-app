import React from 'react'

import withProtectedRoute from 'components/HOC/ProtectedRoute'

import * as S from './styledComponents'

const History = () => {
    return <div>history</div>
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(History)
