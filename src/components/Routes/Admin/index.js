import React, { useState } from 'react'

import withProtectedRoute from '../../HOC/ProtectedRoute'
import { useStateValue } from '../../../logic/store'
import { sortData } from '../../../logic/functions/parsing'
import { useFetch } from '../../../logic/hooks'
import { fetchDefConfig } from '../../../constants/defaultVariables'

import Form from './Form'
import DataDisplay from '../../Shared/DataDisplay'

import * as S from './styledComponents.js'

const { DEF_URL, DEF_PARAMS } = fetchDefConfig

let Admin = props => {
    let handleSignOut = () => {
        dispatch({ type: 'UPDATE_TOKEN', token: '' })
        localStorage.clear()
        props.history.push('/')
    }
    let handleRequest = query => {
        setQuery(query)
    }
    let [selectedCount, setSelectedCount] = useState(0)
    let [, dispatch] = useStateValue()
    let [query, setQuery] = useState(null)
    let [result, error, isLoading, setResult] = useFetch(
        query,
        DEF_URL,
        DEF_PARAMS,
        sortData
    )
    let handleRowInteraction = (id, type) => {
        setResult(result =>
            result.map(e => {
                if (type === 'check' && e.ID === id) {
                    if (e.check) {
                        setSelectedCount(selectedCount - 1)
                    } else {
                        setSelectedCount(selectedCount + 1)
                    }
                }
                return e.ID === id ? { ...e, [type]: !e[type] } : e
            })
        )
    }
    let toggleCheckAll = () => {
        if (result.filter(e => !e.check).length) {
            setSelectedCount(result.length)
            setResult(result =>
                result.map(e => ({
                    ...e,
                    check: true
                }))
            )
        } else {
            setSelectedCount(0)
            setResult(result =>
                result.map(e => ({
                    ...e,
                    check: false
                }))
            )
        }
    }
    let getOutput = () => {
        if (result) {
            if (result.length) {
                return (
                    <DataDisplay
                        data={result}
                        handleRowInteraction={handleRowInteraction}
                        toggleCheckAll={toggleCheckAll}
                        userActionButtons={[]}
                        selectedCount={selectedCount}
                    />
                )
            } else if (error && error.msg) {
                return <S.Error>{error.msg}</S.Error>
            } else if (!isLoading) {
                return <S.Message>Brak wyników</S.Message>
            }
        }
    }
    return (
        <S.Main>
            <S.Header>
                <S.Title>Panel administratora</S.Title>
                <S.Nav>
                    <S.Link to='/admin' exact activeClassName='active'>
                        <S.SearchIcon />
                        Przeglądaj i edytuj
                    </S.Link>
                    <S.Link to='/admin' exact activeClassName='acitve'>
                        <S.AddIcon />
                        Dodaj nowy
                    </S.Link>
                    <S.Link to='/admin' exact activeClassName='acitve'>
                        <S.HistroyIcon />
                        Historia zmian
                    </S.Link>
                </S.Nav>
                <S.Logout onClick={() => handleSignOut()}>Wyloguj</S.Logout>
            </S.Header>
            <S.Content>
                <Form handleRequest={handleRequest} isLoading={isLoading} />
                {getOutput()}
            </S.Content>
        </S.Main>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Admin)
