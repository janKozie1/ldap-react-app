import React from 'react'

import * as S from './styledComponents'

export let Checkbox = ({toggled, clickHandler, id = 0 ,size}) => {
    return (
        <S.Checkbox 
            toggled={toggled}
            onClick={()=>clickHandler(id)}
            size={size}
        />
    )
}

export default Checkbox;