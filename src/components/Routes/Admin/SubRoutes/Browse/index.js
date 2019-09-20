import React, { useState, useEffect } from 'react'

import { useFetch } from 'logic/hooks'
import { sortData } from 'logic/functions/parsing'
import { fetchDefConfig } from 'constants/defaultVariables'
import { useStateValue } from 'logic/store'
import withProtectedRoute from 'components/HOC/ProtectedRoute'

import Search from 'components/Shared/Search'
import DataDisplay from 'components/Shared/DataDisplay'
import EditForm from 'components/Shared/EditForm'

import * as S from './styledComponents'

const { DEF_URL, DEF_PARAMS, BASE_URL } = fetchDefConfig

let Browse = () => {
    let [{ token }] = useStateValue()
    let handleRequest = query => {
        setQuery(query)
    }

    let handleRowInteraction = (id, type) => {
        setResult(result =>
            result.map(e => {
                if (type === 'check' && e.group_ID === id) {
                    if (e.check) {
                        setSelectedCount(selectedCount - 1)
                    } else {
                        setSelectedCount(selectedCount + 1)
                    }
                }
                return e.group_ID === id ? { ...e, [type]: !e[type] } : e
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
    let [selectedCount, setSelectedCount] = useState(0)
    let [isEditing, setIsEditing] = useState(false)
    let [query, setQuery] = useState(null)
    let [recordToEdit, setRecordToEdit] = useState(null)
    let [users, setUsers] = useState([])
    let [querySubmiting, setQuerySubmiting] = useState(false)
    let [result, error, isLoading, setResult] = useFetch(
        query,
        DEF_URL,
        DEF_PARAMS,
        sortData
    )
    let editRecord = data => {
        setRecordToEdit(data)
        setIsEditing(true)
    }
    let stopEditing = () => {
        setIsEditing(false)
        setRecordToEdit(null)
    }
    let submitEdit = async data => {
        setQuerySubmiting(true)
        let res = await fetch(`${BASE_URL}/update`, {
            ...DEF_PARAMS,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        })
        let body = await res.json()
        if (body.ok) {
            setQuerySubmiting(false)
            setResult(result =>
                result.map(e => {
                    return e.group_ID === data.group_ID
                        ? {
                              ...e,
                              owners: [...data.owners],
                              ownersCount: data.owners.length
                          }
                        : e
                })
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
                        editable={true}
                        editFunction={editRecord}
                    />
                )
            } else if (error && error.msg) {
                return <S.Error>{error.msg}</S.Error>
            } else if (!isLoading) {
                return <S.Message>Brak wyników</S.Message>
            }
        }
    }
    useEffect(() => {
        let getUsers = async () => {
            let res = await fetch(`${BASE_URL}/users/allUsers`, DEF_PARAMS)
            let body = await res.json()
            return body
        }
        getUsers().then(e => setUsers([...e]))
    }, [])

    return (
        <>
            <Search handleRequest={handleRequest} isLoading={isLoading} />
            <S.Data>{getOutput()}</S.Data>
            {isEditing && (
                <S.Cover onClick={stopEditing}>
                    <S.EditPanel>
                        <EditForm
                            data={recordToEdit}
                            stopEditing={stopEditing}
                            users={users}
                            submitEdit={submitEdit}
                            querySubmiting={querySubmiting}
                        />
                    </S.EditPanel>
                </S.Cover>
            )}
        </>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Browse)
