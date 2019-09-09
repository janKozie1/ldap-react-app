import styled, { css } from 'styled-components'

export const Form = styled.form`
    margin-top: ${({ theme: { sizes } }) => css`
       calc(${sizes.margins.formMargin} * 2);
    `};
    display: grid;
    grid-auto-flow: column;
`
export const Select = styled.div`
    display: grid;
    grid-auto-rows: 30px;
    height: 30px;
    width: 70px;
    overflow: hidden;
`

export const Option = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    border-right: 0;
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LabelTitle = styled.p``

export const Input = styled.input`
    height: 30px;
    padding: 5px 10px;
    border: 2px solid black;
    font-family: inherit;
`
