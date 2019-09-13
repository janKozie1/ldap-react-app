import React from 'react'

import withProtectedRoute from 'components/HOC/ProtectedRoute'

import * as S from './styledComponents'

const RecordCreator = () => {
    return <div>record creator</div>
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(RecordCreator)
