import styled, { css } from 'styled-components'
import { ReactComponent as expand } from '../../../../assets/arrow.svg'
import { ReactComponent as find } from '../../../../assets/find.svg'

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
    width: 110px;
    position: relative;
    margin-right: 10px;
    z-index: 10;
    ${({ expanded }) =>
        expanded &&
        css`
            svg {
                transform: rotate(180deg);
            }
        `}
`

export const Option = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;
    cursor: pointer;
    color: #666;
    text-transform: lowercase;
    border: 1px solid #ddd;
    border-top-width: 0px;
    border-bottom-width: 0;
    z-index: 12;
    &:last-child {
        border-bottom-width: 1px;
    }
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    ${({ main }) =>
        main &&
        css`
            &:hover {
                background: white;
            }
            border: 2px solid black;
        `}
`
export const OtherOptions = styled.div`
    z-index: 11;
    display: grid;
    grid-auto-rows: 30px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    visibility: hidden;
    ${({ expanded }) =>
        expanded &&
        css`
            visibility: visible;
        `}
`
export const ExpandIcon = styled(expand)`
    width: 20px;
    height: 20px;
    margin-left: auto;
    margin-right: 0;
    transition: transform 0.3s;
`

export let Submit = styled.button`
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    width: 40px;
`

export let FindIcon = styled(find)`
    height: 80%;
    padding: 0 10px;
`

export let InputContainer = styled.div`
    height: 30px;
    border: 2px solid black;
    display: flex;
    align-items: center;
`
export const Input = styled.input`
    height: 100%;
    padding: 5px 0 5px 10px;
    outline: none;
    flex: 1;
    border: 0;
    font-family: inherit;
    width: 300px;
`
