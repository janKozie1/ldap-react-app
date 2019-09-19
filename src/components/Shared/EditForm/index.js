import React, { useState } from 'react'

import * as S from './styledComponents'
import Autocomplete from '../Autocomplete'
import Spinner from '../Spinner'

const EditForm = ({ data, stopEditing, users, submitEdit }) => {
    let [path, setPath] = useState(data.folderPath)
    let [groupName, setGroupName] = useState(data.groupName)
    let [owners, setOwners] = useState(data.owners)
    let [isLoading, setIsLoading] = useState(false)
    let [newOwnerType, setNewOwnerType] = useState('')
    let handleNewOwner = obj => {
        setOwners(owners => [...owners, { ...obj, roleType: '' }])
    }
    let handleFormSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        submitEdit(data)
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
                    {owners.map(e => {
                        return (
                            <React.Fragment key={`${e.user_ID}`}>
                                <S.Cell main>{e.userFullName}</S.Cell>
                                <S.Cell>{e.user_ID}</S.Cell>
                                <S.RoleType
                                    value={e.roleType}
                                    type='text'
                                    onChange={({ target: { value } }) =>
                                        updateRole(e.user_ID, value)
                                    }
                                />
                                <S.Delete
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
            <S.Submit>
                {isLoading ? <Spinner size={20} color={'white'} /> : 'Zapisz'}
            </S.Submit>
        </S.Form>
    )
}

export default EditForm
