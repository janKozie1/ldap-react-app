import React, { useState } from 'react'

import * as S from './styledComponents'

const Input = ({ value, text, type, updateFunc, id }) => {
    let [isFocused, setIsFocused] = useState(false)
    let icon = (name => {
        return name === 'username' ? (
            <S.Username />
        ) : name === 'password' ? (
            <S.Password />
        ) : null
    })(id)
    return (
        <S.Label>
            <S.Placeholder shouldBeUp={isFocused || value}>
                {text}
            </S.Placeholder>
            <S.IconContainer>{icon}</S.IconContainer>
            <S.Input
                type={type}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                onChange={({ target: { value } }) => updateFunc(id, value)}
            />
        </S.Label>
    )
}

export default Input
