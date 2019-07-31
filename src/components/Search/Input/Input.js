import React, {useState} from 'react'

import * as S from './styledComponents'

let Input = ({value, handleInput, fieldName, type, placeholder}) => {
    return (
        <S.Input 
            value={value} 
            onChange={({target:{value}})=>handleInput(value, fieldName)}
            type={type}
            placeholder={placeholder}

        />
    )
}

export default Input