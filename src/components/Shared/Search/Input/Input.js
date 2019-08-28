import React, { useEffect, useRef } from 'react'
import * as S from './styledComponents'

const Input = ({ value, handleInput, fieldName, type, placeholder }) => {
    let inputRef = useRef(null)
    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef])
    return (
        <S.Input
            value={value}
            onChange={({ target: { value } }) => handleInput(value, fieldName)}
            type={type}
            placeholder={placeholder}
            ref={inputRef}
        />
    )
}

export default Input
