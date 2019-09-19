import React, { useState, useEffect } from 'react'

import * as S from './styledComponents'
import Autocomplete from '../Autocomplete'
import { fetchDefConfig } from 'constants/defaultVariables'
const { BASE_URL, DEF_PARAMS } = fetchDefConfig
const EditForm = ({ data, stopEditing }) => {
    let [users, setUsers] = useState([])
    useEffect(() => {
        let getUsers = async () => {
            let res = await fetch(`${BASE_URL}/users/allUsers`, DEF_PARAMS)
            let body = await res.json()
            return body
        }
        getUsers().then(setUsers)
    }, [])
    let [path, setPath] = useState(data.folderPath)
    let [groupName, setGroupName] = useState(data.groupName)
    let [owners, setOwners] = useState(data.owners)
    let handleNewOwner = obj => {
        console.log(obj)
        setOwners(owners => [...owners, obj])
    }
    let handleFormSubmit = e => {
        e.stopPropagation()
        e.preventDefault()
    }
    return (
        <S.Form onClick={handleFormSubmit}>
            <S.Header>
                Edytuj
                <S.CloseIcon onClick={stopEditing} />
            </S.Header>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Input
                    type='text'
                    value={path}
                    onChange={({ target: { value } }) => setPath(value)}
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.Input
                    type='text'
                    value={groupName}
                    onChange={({ target: { value } }) => setGroupName(value)}
                />
            </S.Label>
            <S.SelectLabel as='div'>
                <S.LabelTitle>Właśc.</S.LabelTitle>
                <S.Table>
                    {owners.map(e => {
                        return (
                            <React.Fragment key={`${e.user_ID}-${e.roleType}`}>
                                <S.Cell main>{e.userFullName}</S.Cell>
                                <S.Cell>{e.user_ID}</S.Cell>
                                <S.Cell>
                                    {e.roleType} <S.Delete />
                                </S.Cell>
                            </React.Fragment>
                        )
                    })}
                    <S.Users>
                        <Autocomplete
                            handleAdd={handleNewOwner}
                            options={users}
                            matchBy={'userFullName'}
                            display={'userFullName'}
                            maxRows={10}
                            uniqueKey={'user_ID'}
                        />
                    </S.Users>
                    <S.RoleType></S.RoleType>
                </S.Table>
            </S.SelectLabel>
            <S.Submit>Zapisz</S.Submit>
        </S.Form>
    )
}

export default EditForm
