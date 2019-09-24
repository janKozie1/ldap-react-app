import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'
import Autocomplete from 'components/Shared/Autocomplete'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const UserRemover = ({ onSubmit, loading, response }) => {
    let [userInput, setUserInput] = useState({
        relation_ID: '',
        folderPath: '',
        groupName: ''
    })
    let [relations, setRelations] = useState([])
    useEffect(() => {
        let getRelations = async () => {
            let relations = await fetch(
                `${BASE_URL}/data/allRelations`,
                DEF_PARAMS
            )
            setRelations(await relations.json())
        }
        getRelations()
    }, [])
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit(userInput)
    }
    let handleAdd = data => {
        setUserInput(data)
    }
    let handleGroupInput = data => {
        setUserInput({ ...userInput, groupName: data })
    }
    let handleFolderInput = data => {
        setUserInput({ ...userInput, folderPath: data })
    }

    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Usuń</S.Header>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={relations}
                        matchBy={'groupName'}
                        maxRows={15}
                        uniqueKey={'relation_ID'}
                        display={'groupName'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleGroupInput}
                        value={userInput.groupName}
                        regex={`.*xxx.*`}
                        width={'320px'}
                    />
                </S.AContainer>
            </S.Label>
            <S.Label>
                <S.LabelTitle>Folder</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={relations}
                        matchBy={'folderPath'}
                        maxRows={15}
                        uniqueKey={'relation_ID'}
                        display={'folderPath'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleFolderInput}
                        value={userInput.folderPath}
                        regex={`.*xxx.*`}
                        width={'320px'}
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
