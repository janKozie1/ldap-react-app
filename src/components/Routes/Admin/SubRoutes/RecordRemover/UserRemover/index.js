import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'
import Autocomplete from 'components/Shared/Autocomplete'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const UserRemover = ({ onSubmit, loading, response }) => {
    let [userInput, setUserInput] = useState({
        userFullName: '',
        user_ID: ''
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
    let handleAdd = data => {
        setUserInput(data)
    }
    let handleNameInput = data => {
        setUserInput({ ...userInput, userFullName: data })
    }
    let handleIDInput = data => {
        setUserInput({ ...userInput, user_ID: data })
    }

    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Usuń</S.Header>
            <S.Label>
                <S.LabelTitle>Imie i nazwisko</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={users}
                        matchBy={'userFullName'}
                        maxRows={15}
                        uniqueKey={'user_ID'}
                        display={'userFullName'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleNameInput}
                        value={userInput.userFullName}
                    />
                </S.AContainer>
            </S.Label>
            <S.Label>
                <S.LabelTitle>ID</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={users}
                        matchBy={'user_ID'}
                        maxRows={15}
                        uniqueKey={'user_ID'}
                        display={'user_ID'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleIDInput}
                        value={userInput.user_ID}
                    />
                </S.AContainer>
            </S.Label>
            <S.Footer>
                <S.Message ok={response.ok}>{response.msg}</S.Message>
                <S.Submit>
                    {loading ? <Spinner size={20} color={'white'} /> : 'Usuń'}
                </S.Submit>
            </S.Footer>
        </S.Form>
    )
}

export default UserRemover
