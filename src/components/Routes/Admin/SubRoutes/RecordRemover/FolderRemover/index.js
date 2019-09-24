import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'

import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const UserRemover = ({ onSubmit, loading, response }) => {
    let [userInput, setUserInput] = useState({
        path: '',
        folder_ID: ''
    })
    let [users, setUsers] = useState([])
    useEffect(() => {
        let getUsers = async () => {
            let users = await fetch(`${BASE_URL}/data/allUsers`, DEF_PARAMS)
            setUsers(await users.json())
        }
        getUsers()
    }, [])
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit(userInput)
    }

    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Usuń</S.Header>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Input />
            </S.Label>
            <S.Footer>
                <S.Message ok={response.ok}>{response.msg}</S.Message>
                <S.Submit>
                    {loading ? <Spinner size={20} color={'white'} /> : 'Zapisz'}
                </S.Submit>
            </S.Footer>
        </S.Form>
    )
}

export default UserRemover
