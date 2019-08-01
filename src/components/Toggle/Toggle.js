import React, {useState} from 'react'

import * as S from './styledComponents'

export let Toggle = ({values,updateFunction ,mode}) => {
    return (
       <S.ToggleContainer>
            <S.Label>
                <S.Option onClick={()=>updateFunction(0)}>{values[0].text}</S.Option>
            </S.Label>
            <S.ToggleIndicator  onClick={()=>updateFunction(mode === 0 ? 1 : 0 )} selected={mode}/>
            <S.Label>
                <S.Option  onClick={()=>updateFunction(1)}>{values[1].text}</S.Option>
            </S.Label>
        </S.ToggleContainer>
    )
}
export default Toggle;