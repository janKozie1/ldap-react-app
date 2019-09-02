import React, { useState } from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'

import * as S from './styledComponents'

const Login = () => {
    let [userData, setUserData] = useState({ username: '', password: '' })
    return (
        <S.Page>
            <S.Container>
                <S.Header>Zaloguj się</S.Header>
                <S.Form>
                    <S.Label>
                        <p>Login</p>
                        <S.Input />
                    </S.Label>
                    <S.Label>
                        <p>Hasło</p>
                        <S.Input />
                    </S.Label>
                    <S.Button>Zaloguj</S.Button>
                </S.Form>
            </S.Container>
        </S.Page>
    )
}

export default withProtectedRoute({
    protectedRoute: false,
    redirectTo: '/admin'
})(Login)
