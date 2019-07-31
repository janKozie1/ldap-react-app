import React, { useState } from 'react'

import Input from './Input/Input'

import * as S from './styledComponents'

let Search = () => {
    let [userInput, setUserInput] = useState({
        name: '',
        surname: ''
    })

    let handleInput = (value, fieldName) => {
        setUserInput({ ...userInput, [fieldName]: value })
    }

    return (
        <S.Search>
            <h2>Znajdź użytkownika</h2>
            <S.Form>
                <Input value={userInput.name} handleInput={handleInput} fieldName={'name'} placeholder={'imie'} />
                <Input value={userInput.surname} handleInput={handleInput} fieldName={'surname'} placeholder={'nazwisko'} />
                <S.Submit type='submit'>Szukaj</S.Submit>
            </S.Form>
        </S.Search>

    )
}

export default Search