import React, { useState, useEffect } from 'react'

import Spinner from 'components/Shared/Spinner'

import * as S from './styledComponents'

let f = [
    {
        text: 'ID',
        id: 'userID'
    }
]
const UserCreator = ({ onSubmit, loading, response, fields }) => {
    let [userInput, setUserInput] = useState(
        fields.reduce(
            (prev, curr) => ({
                ...prev,
                [curr.id]: { value: '', text: curr.text }
            }),
            {}
        )
    )
    useEffect(() => {
        setUserInput(
            fields.reduce(
                (prev, curr) => ({
                    ...prev,
                    [curr.id]: { value: '', text: curr.text }
                }),
                {}
            )
        )
    }, [fields])
    let onInput = (value, id) => {
        setUserInput(userInput => ({
            ...userInput,
            [id]: { ...userInput[id], value }
        }))
    }
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit(
            Object.entries(userInput).reduce(
                (prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }),
                {}
            )
        )
    }

    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Dodaj</S.Header>
            {Object.entries(userInput).map(e => {
                return (
                    <S.Label key={e[0]}>
                        <S.LabelTitle>{e[1].text}</S.LabelTitle>
                        <S.Input
                            value={userInput[e[1].value]}
                            onChange={({ target: { value } }) =>
                                onInput(value, e[0])
                            }
                        />
                    </S.Label>
                )
            })}
            <S.Footer>
                <S.Message ok={response.ok}>{response.msg}</S.Message>
                <S.Submit>
                    {loading ? <Spinner size={20} color={'white'} /> : 'Zapisz'}
                </S.Submit>
            </S.Footer>
        </S.Form>
    )
}

export default UserCreator
