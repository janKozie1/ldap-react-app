import React, {useState} from 'react'

import Search from './Search/Search'
import Logo from '../assets/logo.png'

import {useFetch} from '../logic/hooks'

import * as S from './styledComponents'

let App = () => {
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
                <Search handleFormSubmit={handleFormSubmit}/>
            </S.Main>

        </>
    )
}
export default App;