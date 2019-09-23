import React, { useState } from 'react'
import * as S from './styledComponents'

const Autocomplete = ({
    options,
    matchBy,
    defValue = '',
    height = '34px',
    width = '100%',
    maxRows,
    uniqueKey,
    display,
    exclude,
    handleAdd,
    regex
}) => {
    let [value, setValue] = useState(defValue)
    let filteredOptions = options.reduce((prev, curr) => {
        console.log(regex.replace(/xxx/g, value))
        let r = new RegExp(regex.replace(/xxx/g, value) || `^${value}.*`, 'i')
        let toCheck = curr[matchBy]
        if (
            value &&
            toCheck &&
            value !== toCheck &&
            !exclude.filter(curr => curr[matchBy] === toCheck).length &&
            r.test(toCheck.toLowerCase()) &&
            prev.length < 25
        )
            return [...prev, curr]
        else return prev
    }, [])

    let handleOptionSelect = text => {
        if (handleAdd) {
            handleAdd(filteredOptions.find(e => e[display] === text))
            setValue('')
        } else {
            setValue(text)
        }
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
                            <S.Text width={width}>{e[display]}</S.Text>
                        </S.Option>
                    )
                })}
            </S.Options>
        </S.Container>
    )
}

export default Autocomplete
