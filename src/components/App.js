import React, { useState } from 'react'

import Search from './Search/Search'
import Logo from '../assets/logo.png'
import DataDisplay from './DataDisplay/DataDisplay'

import { parseUserList, sortByKey, createCSVTable, downloadObject } from '../logic/functions'
import { useFetch } from '../logic/hooks'
import { fetchDefConfig } from '../constants/defaultVariables'

import * as S from './styledComponents'

let { DEF_URL, DEF_PARAMS } = fetchDefConfig;

let App = () => {
    let handleFormSubmit = (value, { type, fieldID }) => {
        setQuery({ query: value[type].trim(), type: fieldID })
    }
    let handleRowInteraction = (id, type) => {
        setResult(result => result.map(e => {
            if (type === 'check' && e.ID === id) {
                if (e.check) {
                    setSelectedCount(selectedCount - 1)
                } else {
                    setSelectedCount(selectedCount + 1)
                }
            }
            return e.ID === id ?
                { ...e, [type]: !e[type] }
                :
                e;
        }))
    }
    let toggleFieldAll = (field) => {
        field = field.target ? field.target.value : field;
        if (result.map(e => e[field]).filter(e => !e).length) {
            if (field === 'check') {
                setSelectedCount(result.length)
            }
            setResult(result => result.map(e => ({
                ...e,
                [field]: true
            })))
        }
        else {
            if (field === 'check')
                setSelectedCount(0)
            setResult(result => result.map(e => ({
                ...e,
                [field]: false
            })))
        }
    }
    let openChecked = () => {
        if(result.map(e => e.open).filter(e => !e).length){
            toggleFieldAll('open')
        }else{
            setResult(result => result.map(e => ({
                ...e,
                open: ((e.check && !e.open) || (!e.check && e.open))
            })))
        }
       
    }
    let exportChecked = () => {
        if (selectedCount) {
            let csvData = createCSVTable(result.filter(e => e.check))
            let blob = new Blob([csvData], { type: 'text/csv', charset: 'utf-8' })
            downloadObject(blob);
        }
    }
    let parseData = (data) => {
        return parseUserList(data.map(e => ({ ...e, members: sortByKey(e.members, 'description'), owners: sortByKey(e.owners, 'description') })))
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
            func: toggleFieldAll,
            value: 'check',

        },
        {
            text: 'Otwórz',
            func: openChecked,
            value: '',
        },
        {
            text: 'Eksportuj',
            func: exportChecked,
            value: '',
        },

    ]

    let [selectedCount, setSelectedCount] = useState(0)
    let [query, setQuery] = useState(null)
    let [result, error, isLoading, setResult] = useFetch(query, DEF_URL, DEF_PARAMS, parseData)


    let getOutput = () => {
        if (result) {
            if (result.length) {
                return <DataDisplay
                    data={result}
                    handleRowInteraction={handleRowInteraction}
                    toggleFieldAll={toggleFieldAll}
                    userActionButtons={userActionButtons}
                    selectedCount={selectedCount}
                />
            } else if(!isLoading) {
                return <S.Message>Brak wyników</S.Message>
            }
        }
    }

    return (
        <>
            <S.GlobalStyle />
            <S.Main>
                <S.Logo src={Logo} />
                <Search
                    handleFormSubmit={handleFormSubmit}
                    modes={modes}
                    isLoading={isLoading}
                />
                {error &&
                    <S.Error>
                        {error.msg}
                    </S.Error>
                }

                {result
                    &&
                    getOutput()
                }
            </S.Main>

        </>
    )
}
export default App;