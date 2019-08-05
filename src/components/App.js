import React, {useState,useEffect} from 'react'

import Search from './Search/Search'
import Logo from '../assets/logo.png'
import DataDisplay from './DataDisplay/DataDisplay'


import {useFetch} from '../logic/hooks'

import * as S from './styledComponents'

let App = () => {
    let modes = [
        {
            type:'id',
            placeholder:'ID',
            text:'ID',
            fieldID:'id'
        },
        {
            type:'id',
            placeholder:'imie nazwisko',
            text:'Pełne imię',
            fieldID:'fullName'
        }
    ]
    let [query, setQuery] = useState(null)
    let [result,error,isLoading] = useFetch(query)
    let handleFormSubmit = (value,{type,fieldID}) => {
        setQuery({query:value[type].trim(),type:fieldID})
    }
    return (
        <>
            <S.GlobalStyle />

            <S.Main>
                <S.Logo src={Logo}/>
                <Search handleFormSubmit={handleFormSubmit} modes={modes} isLoading={isLoading}/>
                <DataDisplay data={result}></DataDisplay>
            </S.Main>

        </>
    )
}
export default App;