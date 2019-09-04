import React, { useState } from 'react'

import Input from './Input'
import Spinner from '../../Shared/Spinner'
import withProtectedRoute from '../../HOC/ProtectedRoute'

import { useStateValue } from '../../../logic/store'
import { fetchDefConfig } from '../../../constants/defaultVariables'

import * as S from './styledComponents'
const { BASE_URL } = fetchDefConfig
const Login = props => {
    let [, dispatch] = useStateValue()
    let [error, setError] = useState('')
    let [userData, setUserData] = useState({ username: '', password: '' })
    let [isLoading, setIsLoading] = useState(false)
    let handleInput = (id, value) => {
        setUserData(userData => ({ ...userData, [id]: value }))
    }

    let onForumSubmit = async e => {
        e.preventDefault()
        if (!isLoading) {
            setIsLoading(true)
            let res = await fetch(`${BASE_URL}/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            let body = await res.json()
            setTimeout(() => {
                if (res.ok) {
                    let { token } = body
                    dispatch({ type: 'UPDATE_TOKEN', payload: token })
                    localStorage.setItem('token', token)
                    setIsLoading(false)
                    props.history.push('/admin')
                } else {
                    setError(body[0].err)
                }
            }, 300)
        }
    }
    let getMessageContent = () => {
        if (isLoading) return <Spinner size={4} color={'#333'} />

        return error || null
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

                    <S.MessageBox>{getMessageContent()}</S.MessageBox>

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
