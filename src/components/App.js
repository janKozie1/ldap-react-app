import React, {useState} from 'react'

import Search from './Search/Search'
import Toggle from './Toggle/Toggle'
import Logo from '../assets/logo.png'

import {useFetch} from '../logic/hooks'

import * as S from './styledComponents'

let App = () => {
    let modes = [
        {
            type:'id',
            placeholder:'ID',
            text:'ID'
        },
        {
            type:'fullName',
            placeholder:'imie nazwisko',
            text:'Pełne imię'
        }
    ]
    let [mode, setMode] = useState(modes[1]);
    let [query, setQuery] = useState(null)
    let [result,error,isLoading] = useFetch(query)
    let handleFormSubmit = ({fullName}) => {
        setQuery({query:fullName})
    }
    return (
        <>
            <S.GlobalStyle />

            <S.Main>
                <S.Logo src={Logo}/>
                <Toggle values={modes} updateFunction={setMode} />
                <Search handleFormSubmit={handleFormSubmit} modes={modes} mode={mode}/>
            </S.Main>

        </>
    )
}
export default App;