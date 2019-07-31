import React, { useState } from 'react'

import Input from './Input/Input'

import * as S from './styledComponents'

let Search = ({handleFormSubmit}) => {
    let [userInput, setUserInput] = useState({
        fullName: '',
    })

    let handleInput = (value, fieldName) => {
        let newInput = {...userInput}
        newInput[fieldName] = value;
        setUserInput({...newInput})
    }

    let onFormSubmit = (event) =>{
        event.preventDefault();
        handleFormSubmit(userInput)
    }
    return (
        <S.Search>
            <S.FormTitle>Znajdź użytkownika</S.FormTitle>
            <S.Form onSubmit={e=>onFormSubmit(e)}>
                <Input value={userInput.fullName} handleInput={handleInput} fieldName={'fullName'} placeholder={'imie nazwisko'} />
                <S.Submit type='submit'>Szukaj</S.Submit>
            </S.Form>
        </S.Search>

    )
}

export default Search