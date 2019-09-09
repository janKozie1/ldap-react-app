import React from 'react'

import * as S from './styledComponents'

const Form = () => {
    return (
        <S.Form>
            <S.Select>
                <S.Option>Ścieżka</S.Option>
                <S.Option>ID</S.Option>
                <S.Option>Imie</S.Option>
                <S.Option>Grupa</S.Option>
            </S.Select>
            <S.Input></S.Input>
        </S.Form>
    )
}

export default Form
