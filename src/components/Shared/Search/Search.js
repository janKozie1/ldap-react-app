import React, { useState } from 'react'

import Input from './Input/Input'
import Toggle from '../Toggle/Toggle'
import Spinner from '../Spinner/Spinner'

import * as S from './styledComponents'

const Search = ({ handleFormSubmit, modes, isLoading }) => {
    let [mode, setMode] = useState(0)
    let { type, placeholder } = modes[mode]
    let [userInput, setUserInput] = useState(
        Object.fromEntries(modes.map(e => [e.type, '']))
    )
    let handleInput = (value, fieldName) => {
        let newInput = { ...userInput }
        newInput[fieldName] = value
        setUserInput({ ...newInput })
    }

    let onFormSubmit = event => {
        event.preventDefault()
        if (userInput[modes[mode].type] && !isLoading)
            handleFormSubmit(userInput, modes[mode])
    }
    return (
        <S.Search>
            <S.FormTitle>Właściciel folderu i członkowie grup</S.FormTitle>
            <S.Form onSubmit={e => onFormSubmit(e)}>
                <Toggle values={modes} updateFunction={setMode} mode={mode} />
                <Input
                    value={userInput[type]}
                    handleInput={handleInput}
                    fieldName={type}
                    placeholder={placeholder}
                />

                <S.Submit type='submit'>
                    {isLoading ? (
                        <Spinner color={'white'} size={3} />
                    ) : (
                        'Szukaj'
                    )}
                </S.Submit>
            </S.Form>
        </S.Search>
    )
}

export default Search
