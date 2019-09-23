import React, { useState } from 'react'

import * as S from './styledComponents'
import Autocomplete from '../Autocomplete'
import Spinner from '../Spinner'

const EditForm = ({
    data,
    stopEditing,
    users,
    submitEdit,
    querySubmiting,
    updateResult
}) => {
    let [path, setPath] = useState(data.folderPath)
    let [groupName, setGroupName] = useState(data.groupName)
    let [owners, setOwners] = useState(data.owners)
    let [userInput, setUserInput] = useState('')
    let [newOwnerType, setNewOwnerType] = useState('')
    let handleNewOwner = obj => {
        setOwners(owners => [...owners, { ...obj, roleType: '' }])
        setUserInput('')
    }
    let handleFormSubmit = async e => {
        e.preventDefault()
        let req = (({ group_ID, folder_ID }) => ({
            group_ID,
            folder_ID
        }))(data)
        if (!querySubmiting) submitEdit({ ...req, owners, path, groupName })
    }
    let handleRemove = id => {
        setOwners(owners => owners.filter(e => e.user_ID !== id))
    }
    let updateRole = (id, value) => {
        setOwners(owners =>
            owners.map(e => (e.user_ID === id ? { ...e, roleType: value } : e))
        )
    }
    return (
        <S.Form onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <S.Header>
                Edytuj
                <S.CloseIcon onClick={stopEditing} />
            </S.Header>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Input
                    type='text'
                    value={path}
                    readOnly
                    onChange={({ target: { value } }) => setPath(value)}
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.Input
                    type='text'
                    value={groupName}
                    readOnly
                    onChange={({ target: { value } }) => setGroupName(value)}
                />
            </S.Label>
            <S.SelectLabel as='div'>
                <S.LabelTitle>Właśc.</S.LabelTitle>
                <S.Table>
                    {owners.map((e, i) => {
                        return (
                            <React.Fragment key={`${e.user_ID}`}>
                                <S.Cell main readonly>
                                    {e.userFullName}
                                </S.Cell>
                                <S.Cell readonly>{e.user_ID}</S.Cell>
                                <S.RoleType
                                    value={e.roleType}
                                    type='text'
                                    onChange={({ target: { value } }) =>
                                        updateRole(e.user_ID, value)
                                    }
                                />
                                <S.Delete
                                    row={i}
                                    onClick={() => handleRemove(e.user_ID)}
                                />
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
                            exclude={owners}
                            uniqueKey={'user_ID'}
                            value={userInput}
                            handleInput={setUserInput}
                        />
                    </S.Users>
                    <S.RoleType
                        type='text'
                        value={newOwnerType}
                        onChange={({ target: { value } }) =>
                            setNewOwnerType(value)
                        }
                    />
                </S.Table>
            </S.SelectLabel>
            <S.Footer>
                <S.Message ok={updateResult.ok}>{updateResult.msg}</S.Message>
                <S.Submit>
                    {querySubmiting ? (
                        <Spinner size={20} color={'white'} />
                    ) : (
                        'Zapisz'
                    )}
                </S.Submit>
            </S.Footer>
        </S.Form>
    )
}

export default EditForm
