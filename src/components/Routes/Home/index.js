import React, { useState } from 'react'

import Search from '../../Shared/Search'
import Logo from '../../../assets/logo.png'
import DataDisplay from '../../Shared/DataDisplay'

import {
    parseUserList,
    sortByKey,
    sortData
} from '../../../logic/functions/parsing'
import {
    createCSVTable,
    downloadObject
} from '../../../logic/functions/exporting'

import { useFetch } from '../../../logic/hooks'
import { fetchDefConfig } from '../../../constants/defaultVariables'

import * as S from './styledComponents'

let { DEF_URL, DEF_PARAMS } = fetchDefConfig

const App = () => {
    let handleFormSubmit = (value, { type, fieldID }) => {
        setQuery({ query: value[type].trim(), type: fieldID })
    }
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
    let openChecked = () => {
        if (result.filter(e => e.check && !e.open).length) {
            setResult(result =>
                result.map(e => {
                    return {
                        ...e,
                        open: e.check
                    }
                })
            )
        } else {
            setResult(result =>
                result.map(e => {
                    return {
                        ...e,
                        open: !e.check && e.open
                    }
                })
            )
        }
    }
    let exportChecked = () => {
        if (selectedCount) {
            let csvData = createCSVTable(result.filter(e => e.check))
            let blob = new Blob([csvData], {
                type: 'text/csv',
                charset: 'utf-8'
            })
            downloadObject(blob)
        }
    }

    let modes = [
        {
            type: 'id',
            placeholder: 'ID',
            text: 'ID',
            fieldID: 'id'
        },
        {
            type: 'id',
            placeholder: 'imie nazwisko',
            text: 'Pełne imię',
            fieldID: 'fullName'
        }
    ]
    let userActionButtons = [
        {
            text: 'Zaznacz',
            func: toggleCheckAll,
            value: 'check'
        },
        {
            text: 'Rozwiń',
            func: openChecked,
            value: ''
        },
        {
            text: 'Eksportuj',
            func: exportChecked,
            value: ''
        }
    ]

    let [selectedCount, setSelectedCount] = useState(0)
    let [query, setQuery] = useState(null)
    let [result, error, isLoading, setResult] = useFetch(
        query,
        DEF_URL,
        DEF_PARAMS,
        sortData
    )

    let getOutput = () => {
        if (result) {
            if (result.length) {
                return (
                    <DataDisplay
                        data={result}
                        handleRowInteraction={handleRowInteraction}
                        toggleCheckAll={toggleCheckAll}
                        userActionButtons={userActionButtons}
                        selectedCount={selectedCount}
                    />
                )
            } else if (!isLoading) {
                return <S.Message>Brak wyników</S.Message>
            }
        }
    }
    return (
        <S.Main>
            <S.Logo src={Logo} />
            <Search
                handleFormSubmit={handleFormSubmit}
                modes={modes}
                isLoading={isLoading}
            />
            {error && <S.Error>{error.msg}</S.Error>}

            {getOutput()}
        </S.Main>
    )
}
export default App
