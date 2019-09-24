import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'
import Autocomplete from 'components/Shared/Autocomplete'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const UserRemover = ({ onSubmit, loading, response }) => {
    let [userInput, setUserInput] = useState({
        groupName: '',
        group_ID: ''
    })
    let [groups, setGroups] = useState([])
    useEffect(() => {
        let getGroups = async () => {
            let users = await fetch(`${BASE_URL}/data/allGroups`, DEF_PARAMS)
            setGroups(await users.json())
        }
        getGroups()
    }, [])
    let handleAdd = obj => {
        setUserInput(obj)
    }
    let handleInput = data => {
        setUserInput({ ...userInput, groupName: data })
    }
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit(userInput)
    }
    console.log(groups)
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Usuń</S.Header>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={groups}
                        matchBy={'groupName'}
                        maxRows={15}
                        uniqueKey={'group_ID'}
                        display={'groupName'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleInput}
                        value={userInput.groupName}
                        regex={`.*xxx.*`}
                        width={'320px'}
                    />
                </S.AContainer>
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
