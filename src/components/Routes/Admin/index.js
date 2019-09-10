import React from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'
import { useStateValue } from '../../../logic/store'
import { fetchDefConfig } from '../../../constants/defaultVariables'

import Form from './Form'

import * as S from './styledComponents.js'

const { DEF_URL, DEF_PARAMS } = fetchDefConfig

let Admin = props => {
    let [, dispatch] = useStateValue()

    let handleSignOut = () => {
        dispatch({ type: 'UPDATE_TOKEN', token: '' })
        localStorage.clear()
        props.history.push('/')
    }

    let handleRequest = async req => {
        let res = await fetch(DEF_URL, {
            ...DEF_PARAMS,
            body: JSON.stringify(req)
        })
        let body = await res.json()
    }

    return (
        <S.Main>
            <S.Header>
                <S.Title>Panel administratora</S.Title>
                <S.Nav>
                    <S.Link to='/admin' exact>
                        <S.SearchIcon />
                        Przeglądaj wpisy
                    </S.Link>
                    <S.Link to='/admin' exact>
                        <S.HistroyIcon />
                        Historia zmian
                    </S.Link>
                </S.Nav>
                <S.Logout onClick={() => handleSignOut()}>Wyloguj</S.Logout>
            </S.Header>
            <S.Content>
                <Form handleRequest={handleRequest} />
            </S.Content>
        </S.Main>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
