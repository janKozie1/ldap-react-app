import React, { useState } from 'react'

import Search from './Search/Search'
import Logo from '../assets/logo.png'
import DataDisplay from './DataDisplay/DataDisplay'

import { parseUserList } from '../logic/functions'

import { useFetch } from '../logic/hooks'

import * as S from './styledComponents'

import { fetchDefConfig } from '../constants/defaultVariables'

let { DEF_URL, DEF_PARAMS } = fetchDefConfig;

let App = () => {
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
    let [query, setQuery] = useState(null)
    let [result, error, isLoading, setResponse] = useFetch(query, DEF_URL, DEF_PARAMS, parseUserList)

    let handleFormSubmit = (value, { type, fieldID }) => {
        setQuery({ query: value[type].trim(), type: fieldID })
    }

    let handleRowInteraction = (id, type) => {
        setResponse(result.map(e => {
            return e.ID === id ?
                { ...e, [type]: !e[type] }
                :
                e;
        }))

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
                {
                    result
                    &&
                    <DataDisplay
                        data={result}
                        handleRowInteraction={handleRowInteraction}
                    />
                }
            </S.Main>

        </>
    )
}
export default App;