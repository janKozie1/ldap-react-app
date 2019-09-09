import React from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'
import { useStateValue } from '../../../logic/store'

import Form from './Form'

import * as S from './styledComponents.js'
let Admin = props => {
    let [, dispatch] = useStateValue()
    let handleSignOut = () => {
        dispatch({ type: 'UPDATE_TOKEN', token: '' })
        localStorage.clear()
        props.history.push('/')
    }
    return (
        <S.Main>
            <S.Header>
                <S.Title>Panel administratora</S.Title>
                <S.Nav>
                    <S.Link>
                        <S.SearchIcon />
                        Przeglądaj wpisy
                    </S.Link>
                    <S.Link>
                        <S.HistroyIcon />
                        Historia zmian
                    </S.Link>
                </S.Nav>
                <S.Logout onClick={() => handleSignOut()}>Wyloguj</S.Logout>
            </S.Header>
            <S.Content>
                <Form />
            </S.Content>
        </S.Main>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
