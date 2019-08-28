import React from 'react'

import * as S from './styledComponents'

const Checkbox = ({ checked, clickHandler, returnData = 0, size }) => {
    return (
        <S.Checkbox
            checked={checked}
            onClick={() => clickHandler(returnData)}
            size={size}
        />
    )
}

export default Checkbox
