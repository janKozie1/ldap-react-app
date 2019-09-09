import React, { useState } from 'react'

import * as S from './styledComponents'
import { userInfo } from 'os'

const OPTIONS = [
    {
        text: 'id',
        _id: 'id'
    },
    {
        text: 'imię',
        _id: 'name'
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

const Form = () => {
    let [expanded, setExpanded] = useState(false)
    let [current, setCurrent] = useState(OPTIONS[0])
    let [userInput, setUserInput] = useState('')
    let changeOption = _id => {
        setCurrent(OPTIONS.find(e => e._id === _id))
        setExpanded(false)
    }
    let fetchData = async => {
        console.log(current._id, userInput)
    }
    return (
        <S.Form>
            <S.Select expanded={expanded}>
                <S.Option onClick={() => setExpanded(expanded => !expanded)}>
                    {current.text}
                    <S.ExpandIcon />
                </S.Option>
                {OPTIONS.map(e => {
                    return (
                        <S.Option
                            key={e._id}
                            onClick={() => changeOption(e._id)}>
                            {e.text}
                        </S.Option>
                    )
                })}
            </S.Select>
            <S.InputContainer>
                <S.Input
                    placeholder={'Szukana fraza'}
                    value={userInput}
                    onChange={({ target: { value } }) =>
                        setUserInput(value)
                    }></S.Input>
                <S.FindIcon onClick={() => fetchData()} />
            </S.InputContainer>
        </S.Form>
    )
}

export default Form
