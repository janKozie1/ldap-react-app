import React, { useState, useEffect } from 'react'

import Autocomplete from 'components/Shared/Autocomplete'
import Spinner from 'components/Shared/Spinner'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const GroupForm = ({ onSubmit, response, loading }) => {
    let [folders, setFolders] = useState([])
    let [groups, setGroups] = useState([])
    let [group, setGroup] = useState({
        group_ID: null,
        groupName: ''
    })
    let [folder, setFolder] = useState({
        folder_ID: null,
        folderPath: ''
    })
    useEffect(() => {
        let getData = async () => {
            let folders = await fetch(`${BASE_URL}/data/allFolders`, DEF_PARAMS)
            let groups = await fetch(`${BASE_URL}/data/allGroups`, DEF_PARAMS)
            setGroups(await groups.json())
            setFolders(await folders.json())
        }
        getData()
    }, [])
    let handleAdd = obj => {
        setFolder(obj)
    }
    let handleGroupAdd = obj => {
        setGroup(obj)
    }
    let pathInput = data => {
        setFolder({ ...folder, folderPath: data })
    }
    let groupInput = data => {
        setGroup({ ...group, groupName: data })
    }
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit({ group, folder })
    }
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Dodaj</S.Header>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.Container>
                    <Autocomplete
                        options={groups}
                        matchBy={'groupName'}
                        maxRows={6}
                        uniqueKey={'group_ID'}
                        display={'groupName'}
                        exclude={[]}
                        width={'320px'}
                        regex={`.*xxx.*`}
                        value={group.groupName}
                        handleInput={groupInput}
                        handleAdd={handleGroupAdd}
                    />
                </S.Container>
            </S.Label>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Container>
                    <Autocomplete
                        options={folders}
                        matchBy={'folderPath'}
                        maxRows={6}
                        uniqueKey={'folder_ID'}
                        display={'folderPath'}
                        exclude={[]}
                        width={'320px'}
                        regex={`.*xxx.*`}
                        value={folder.folderPath}
                        handleInput={pathInput}
                        handleAdd={handleAdd}
                    />
                </S.Container>
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

export default GroupForm
