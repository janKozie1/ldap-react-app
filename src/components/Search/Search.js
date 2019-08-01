import React, { useState } from 'react'

import Input from './Input/Input'
import Toggle from '../Toggle/Toggle'
import * as S from './styledComponents'

let Search = ({ handleFormSubmit, modes }) => {
    let [mode, setMode] = useState(0)
    let { type, placeholder } = modes[mode];
    let [userInput, setUserInput] = useState(Object.fromEntries(modes.map(e => [e.type, ''])))
    console.log(userInput)
    let handleInput = (value, fieldName) => {
        let newInput = { ...userInput }
        newInput[fieldName] = value;
        setUserInput({ ...newInput })
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        handleFormSubmit(userInput, mode)
    }
    return (

        <S.Search>
            <S.FormTitle>Znajdź użytkownika</S.FormTitle>
            <S.Form onSubmit={e => onFormSubmit(e)}>
                <Toggle values={modes} updateFunction={setMode} mode={mode} />

                <Input value={userInput[type]} handleInput={handleInput} fieldName={type} placeholder={placeholder} />
                <S.Submit type='submit'>Szukaj</S.Submit>

            </S.Form>
        </S.Search>

    )
}

export default Search