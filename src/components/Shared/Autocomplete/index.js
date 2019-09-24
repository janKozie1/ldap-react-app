import React, { useState, useRef } from 'react'
import * as S from './styledComponents'

const Autocomplete = ({
    options,
    matchBy,
    height = '34px',
    width = '100%',
    maxRows,
    uniqueKey,
    display,
    exclude,
    handleAdd,
    handleInput,
    value,
    regex
}) => {
    let ref = useRef(null)
    let [isFocused, setIsFocused] = useState(false)
    let filteredOptions = options.reduce((prev, curr) => {
        let r = new RegExp(
            regex
                ? regex.replace(/xxx/g, value).replace(/\\/g, '\\\\')
                : `^${value}.*`,
            'i'
        )
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
        ref.current.blur()
        handleAdd(filteredOptions.find(e => e[display] === text))
    }
    return (
        <S.Container>
            <S.Input
                type='text'
                height={height}
                value={value}
                onFocus={() => setIsFocused(true)}
                ref={ref}
                onChange={({ target: { value } }) => handleInput(value)}
            />
            <S.Options isVisible={isFocused} maxRows={maxRows} height={height}>
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
