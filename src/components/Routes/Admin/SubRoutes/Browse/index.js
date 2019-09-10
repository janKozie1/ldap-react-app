import React, { useState } from 'react'

import { useFetch } from '../../../../../logic/hooks'
import { sortData } from '../../../../../logic/functions/parsing'
import { fetchDefConfig } from '../../../../../constants/defaultVariables'

import withProtectedRoute from '../../../../HOC/ProtectedRoute'

import Form from '../../Form'
import DataDisplay from '../../../../Shared/DataDisplay'

import * as S from './styledComponents'

const { DEF_URL, DEF_PARAMS } = fetchDefConfig

let Browse = () => {
    let handleRequest = query => {
        setQuery(query)
    }

    console.log('?')
    let [selectedCount, setSelectedCount] = useState(0)
    let [query, setQuery] = useState(null)
    let [result, error, isLoading, setResult] = useFetch(
        query,
        DEF_URL,
        DEF_PARAMS,
        sortData
    )
    let handleRowInteraction = (id, type) => {
        setResult(result =>
            result.map(e => {
                if (type === 'check' && e.ID === id) {
                    if (e.check) {
                        setSelectedCount(selectedCount - 1)
                    } else {
                        setSelectedCount(selectedCount + 1)
                    }
                }
                return e.ID === id ? { ...e, [type]: !e[type] } : e
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
            <Form handleRequest={handleRequest} isLoading={isLoading} />
            {getOutput()}
        </>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(Browse)
