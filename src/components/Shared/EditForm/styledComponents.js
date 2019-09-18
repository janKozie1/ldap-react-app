import styled, { css } from 'styled-components'
import { ReactComponent as close } from 'assets/close.svg'
export const Form = styled.form`
    width: 100%;
    padding: 20px 40px;
    outline: 3px solid #333;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
`

export const Header = styled.h2`
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
`
export const CloseIcon = styled(close)`
    height: 30px;
    width: 30px;
    position: absolute;
    right: 10px;
    top: 15px;
    padding: 5px;
    cursor: pointer;
    > path {
        fill: ${({ theme: { colors } }) => colors.error};
    }
`
export const Label = styled.label`
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

export const LabelTitle = styled.p`
    font-weight: bolder;
    margin-right: 20px;
    height: 36px;
    line-height: 36px;
`

export const Input = styled.input`
    width: 400px;
    border: 0;
    padding: 8px 15px;
    font-family: inherit;
    border: 2px solid #333;
    color: #333;
`

export let Table = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: 36px;
    width: 400px;
    grid-auto-flow: row;
    align-items: center;
    font-size: 0.8rem;
    border: 1px solid #333;
    * {
        margin: 0;
    }
    p {
        border: 1px solid #333;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
