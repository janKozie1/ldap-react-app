import React from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'
import { useStateValue } from '../../../logic/store'

import { Route, Redirect } from 'react-router-dom'

import Browse from './SubRoutes/Browse'
import RecordCreator from './SubRoutes/RecordCreator'
import History from './SubRoutes/History'
import RecordRemover from './SubRoutes/RecordRemover'

import * as S from './styledComponents.js'

let Admin = props => {
    let handleSignOut = () => {
        dispatch({ type: 'UPDATE_TOKEN', token: '' })
        localStorage.clear()
        props.history.push('/')
    }
    let [, dispatch] = useStateValue()

    return (
        <S.Main>
            <S.Header>
                <S.Title>Panel administratora</S.Title>
                <S.Nav>
                    <S.Link to='/admin/browse' activeClassName='active'>
                        <S.SearchIcon />
                        Przeglądaj i edytuj
                    </S.Link>
                    <S.Link to='/admin/add' activeClassName='active'>
                        <S.AddIcon />
                        Dodaj nowy
                    </S.Link>
                    <S.Link to='/admin/remove' activeClassName='active'>
                        <S.RemoveIcon />
                        Usuń rekordy
                    </S.Link>
                </S.Nav>
                <S.Logout onClick={() => handleSignOut()}>Wyloguj</S.Logout>
            </S.Header>
            <S.Content>
                <Route path='/admin/browse/' exact component={Browse} />
                <Route path='/admin/add/' exact component={RecordCreator} />
                <Route path='/admin/remove/' exact component={RecordRemover} />
                <Route path='/admin/history/' exact component={History} />
                <Redirect from='/' exact to='/admin/browse' />
            </S.Content>
        </S.Main>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
