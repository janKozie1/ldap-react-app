import React from 'react'

import Search from './Search/Search'

import Logo from '../assets/logo.png'
import * as S from './styledComponents'

let App = () => {
    return (
        <>
            <S.GlobalStyle />

            <S.Main>
                <S.Logo src={Logo}/>
                <Search />
            </S.Main>

        </>
    )
}
export default App;