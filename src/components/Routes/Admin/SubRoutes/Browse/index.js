import React, { useState } from 'react'

import { useFetch } from 'logic/hooks'
import { sortData } from 'logic/functions/parsing'
import { fetchDefConfig } from 'constants/defaultVariables'

import withProtectedRoute from 'components/HOC/ProtectedRoute'

import Search from 'components/Shared/Search'
import DataDisplay from 'components/Shared/DataDisplay'
import EditForm from 'components/Shared/EditForm'

import * as S from './styledComponents'

const { DEF_URL, DEF_PARAMS } = fetchDefConfig

let Browse = () => {
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
    let [recordToEdit, setRecordToEdit] = useState({})
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

    return (
        <>
            <Search handleRequest={handleRequest} isLoading={isLoading} />
            <S.Container isEditing={isEditing}>
                <S.Data>{getOutput()}</S.Data>
                <S.EditPanel>
                    <EditForm data={recordToEdit} />
                </S.EditPanel>
            </S.Container>
        </>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Browse)
