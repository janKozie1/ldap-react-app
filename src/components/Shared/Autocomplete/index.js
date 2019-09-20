import React, { useState } from 'react'
import * as S from './styledComponents'

const Autocomplete = ({
    options,
    matchBy,
    defValue = '',
    height = '34px',
    maxRows,
    uniqueKey,
    display,
    exclude,
    handleAdd
}) => {
    let [value, setValue] = useState(defValue)
    let filteredOptions = options.filter(e => {
        let r = new RegExp(`^${value}.*`, 'i')
        let toCheck = e[matchBy]
        return (
            value &&
            toCheck &&
            value !== toCheck &&
            !exclude.filter(ex => ex[matchBy] === toCheck).length &&
            r.test(toCheck.toLowerCase())
        )
    })

    let handleOptionSelect = text => {
        handleAdd(filteredOptions.find(e => e[display] === text))
        setValue('')
    }
    return (
        <S.Container>
            <S.Input
                type='text'
                height={height}
                value={value}
                onChange={({ target: { value } }) => setValue(value)}
            />
            <S.Options maxRows={maxRows} height={height}>
                {filteredOptions.map(e => {
                    return (
                        <S.Option
                            onClick={() => handleOptionSelect(e[display])}
                            key={e[uniqueKey]}>
                            {e[display]}
                        </S.Option>
                    )
                })}
            </S.Options>
        </S.Container>
    )
}

export default Autocomplete
