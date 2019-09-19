import React, { useState } from 'react'

import * as S from './styledComponents'
import Spinner from '../Spinner'
import Select from '../Select'
const OPTIONS = [
    {
        text: 'id',
        _id: 'id'
    },
    {
        text: 'imię',
        _id: 'fullName'
    },
    {
        text: 'grupa',
        _id: 'group'
    },
    {
        text: 'scieżka',
        _id: 'path'
    }
]

const Form = ({ handleRequest, isLoading }) => {
    let [current, setCurrent] = useState(OPTIONS[0])
    let [userInput, setUserInput] = useState('')
    let onFormSubmit = e => {
        e.preventDefault()
        handleRequest({ type: current._id, query: userInput })
    }
    let handleSelect = obj => {
        setCurrent(obj)
    }
    return (
        <S.Form onSubmit={onFormSubmit}>
            <Select
                current={current}
                options={OPTIONS}
                selectFunction={handleSelect}
            />
            <S.InputContainer>
                <S.Input
                    placeholder={'Szukana fraza'}
                    value={userInput}
                    onChange={({ target: { value } }) =>
                        setUserInput(value)
                    }></S.Input>
                <S.Submit>
                    {isLoading ? (
                        <Spinner color={'black'} size={16} />
                    ) : (
                        <S.FindIcon />
                    )}
                </S.Submit>
            </S.InputContainer>
        </S.Form>
    )
}

export default Form
