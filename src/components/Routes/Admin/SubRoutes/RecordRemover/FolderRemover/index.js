import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'
import Autocomplete from 'components/Shared/Autocomplete'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const UserRemover = ({ onSubmit, loading, response }) => {
    let [userInput, setUserInput] = useState({
        folderPath: '',
        folder_ID: ''
    })
    let [folders, setFolders] = useState([])
    useEffect(() => {
        let getFolders = async () => {
            let folders = await fetch(`${BASE_URL}/data/allFolders`, DEF_PARAMS)
            setFolders(await folders.json())
        }
        getFolders()
    }, [])
    let handleAdd = obj => {
        setUserInput(obj)
    }
    let handleInput = data => {
        setUserInput({ ...userInput, folderPath: data })
    }
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit(userInput)
    }
    console.log(folders)
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Usuń</S.Header>
            <S.Label>
                <S.LabelTitle>Folder</S.LabelTitle>
                <S.AContainer>
                    <Autocomplete
                        options={folders}
                        matchBy={'folderPath'}
                        maxRows={15}
                        uniqueKey={'folder_ID'}
                        display={'folderPath'}
                        exclude={[]}
                        handleAdd={handleAdd}
                        handleInput={handleInput}
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
