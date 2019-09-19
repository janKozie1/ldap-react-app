import React, { useState } from 'react'
import * as S from './styledComponents'

const Select = ({
    options,
    current,
    selectFunction,
    width,
    height,
    border
}) => {
    let [expanded, setExpanded] = useState(false)
    let changeOption = _id => {
        let newCurrent = options.find(e => e._id === _id) || options[0]
        selectFunction(newCurrent)
        setExpanded(false)
    }
    return (
        <S.Select width={width} height={height} expanded={expanded}>
            <S.Option
                main
                border={border}
                onClick={() => setExpanded(expanded => !expanded)}>
                {current.text}
                <S.ExpandIcon />
            </S.Option>
            <S.OtherOptions height={height} expanded={expanded}>
                {options.map(e => {
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
    )
}

export default Select
