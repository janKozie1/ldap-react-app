import React, { useState } from 'react'

import Input from './Input'
import withProtectedRoute from '../../HOC/ProtectedRoute'

import { useFetch } from '../../../logic/hooks'
import { fetchDefConfig } from '../../../constants/defaultVariables'
import * as S from './styledComponents'
const { BASE_URL, DEF_PARAMS } = fetchDefConfig
const Login = () => {
    let [userData, setUserData] = useState({ username: '', password: '' })
    let [isLoading, setIsLoading] = useState(false)
    let handleInput = (id, value) => {
        setUserData(userData => ({ ...userData, [id]: value }))
    }

    let onForumSubmit = async e => {
        e.preventDefault()
        let res = await fetch(`${BASE_URL}/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        let body = await res.json()
        console.log(body)
    }
    return (
        <S.Page>
            <S.Container>
                <S.Header>Zaloguj się</S.Header>
                <S.Form onSubmit={onForumSubmit}>
                    <Input
                        value={userData.username}
                        text='Login'
                        id='username'
                        updateFunc={handleInput}
                        type='text'
                    />
                    <Input
                        value={userData.password}
                        text='Hasło'
                        id='password'
                        updateFunc={handleInput}
                        type='password'
                    />
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
