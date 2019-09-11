import React, { useState } from 'react'

import * as S from './styledComponents'
import Spinner from '../Spinner'

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
    let [expanded, setExpanded] = useState(false)
    let [current, setCurrent] = useState(OPTIONS[0])
    let [userInput, setUserInput] = useState('')
    let changeOption = _id => {
        setCurrent(OPTIONS.find(e => e._id === _id))
        setExpanded(false)
    }
    let onFormSubmit = e => {
        e.preventDefault()
        handleRequest({ type: current._id, query: userInput })
    }
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Select expanded={expanded}>
                <S.Option
                    main
                    onClick={() => setExpanded(expanded => !expanded)}>
                    {current.text}
                    <S.ExpandIcon />
                </S.Option>
                <S.OtherOptions expanded={expanded}>
                    {OPTIONS.map(e => {
                        return (
                            <S.Option
                                key={e._id}
                                onClick={() => changeOption(e._id)}>
                                {e.text}
                            </S.Option>
                        )
                    })}
                </S.OtherOptions>
            </S.Select>
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
