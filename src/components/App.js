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
    let [result, error, isLoading, setResult] = useFetch(query, DEF_URL, DEF_PARAMS, parseUserList)

    let handleFormSubmit = (value, { type, fieldID }) => {
        setQuery({ query: value[type].trim(), type: fieldID })
    }

    let handleRowInteraction = (id, type) => {
        setResult(result.map(e => {
            return e.ID === id ?
                { ...e, [type]: !e[type] }
                :
                e;
        }))
    }

    let toggleFieldAll = (field) => {
        field = field.target ? field.target.value : field;
        if(result.map(e=>e[field]).filter(e=>!e).length)
            setResult(result.map(e=>({
                ...e,
                [field]:true
            })))
        else
            setResult(result.map(e=>({
                ...e,
                [field]:false
            })))
    }
    let openChecked = () =>{
        setResult(result.map(e=>({
            ...e,
            open:(e.check && !e.open)
        })))
    }
    let exportChecked = () =>{

    }
    let userActionButtons = [
        {
            text:'Zaznacz',
            func:toggleFieldAll,
            value:'check',
            
        },
        {
            text:'Otwórz',
            func:openChecked,
            value:'',
        },
        {
            text:'Eksportuj',
            func:exportChecked,
            value:'',
        },

    ]

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

                {
                    result
                    &&
                    <DataDisplay
                        data={result}
                        handleRowInteraction={handleRowInteraction}
                        toggleFieldAll={toggleFieldAll}
                        userActionButtons={userActionButtons}
                    />
                }
            </S.Main>

        </>
    )
}
export default App;