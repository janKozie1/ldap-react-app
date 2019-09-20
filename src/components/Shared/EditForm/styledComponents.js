import styled, { css } from 'styled-components'
import { ReactComponent as close } from 'assets/close.svg'
import { ReactComponent as delete_icon } from 'assets/delete.svg'
import { ReactComponent as arrow } from 'assets/arrow.svg'

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
    padding: 5px;
    margin-right: -30px;
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
    flex-wrap: wrap;
`

export const SelectLabel = styled(Label)`
    margin-bottom: 40px;
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
    grid-template-columns: 2fr 1fr 1fr;
    grid-auto-rows: 34px;
    width: 400px;
    grid-auto-flow: row;
    align-items: center;
    font-size: 0.8rem;
    border: 1px solid black;
    position: relative;
`

export let Cell = styled.p`
    padding: 8px 15px;
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    border: 1px solid #333;
    align-items: center;
    justify-content: center;
    ${({ main }) =>
        main &&
        css`
            justify-content: flex-start;
        `}
    ${({ readonly }) =>
        readonly &&
        css`
            color: #999;
        `}
`

export let Delete = styled(delete_icon)`
    height: 34px;
    width: 34px;
    padding: 7px;
    position: absolute;
    right: -35px;
    cursor: pointer;
    grid-column: 3/4;
    grid-row: ${({ row }) => `${row + 1} / ${row + 2}`};
    > path {
        fill: #ccc;
        transition: fill 0.3s;
    }
    &:hover {
        path {
            fill: #333;
        }
    }
`

export let Footer = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    align-self: flex-end;
`

export let Submit = styled.button`
    background: ${({ theme: { colors } }) => colors.green};
    border: 0;
    height: 100%;
    width: 80px;
    font-family: inherit;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    cursor: pointer;
    position: relative;
`

export let Message = styled.p`
    margin: 0;
    margin-right: 20px;
    font-size: 0.8rem;
    color: ${({ theme: { colors }, ok }) => (ok ? colors.green : colors.error)};
`

export let Users = styled.div`
    grid-column: 1/3;
    height: 100%;
    width: 100%;
    border: 1px solid #333;
    position: relative;
`

export let Expand = styled(arrow)`
    height: 30px;
    width: 30px;
    padding: 5px;
    position: absolute;
    right: 0;
    > path {
        fill: #333;
    }
`

export let RoleType = styled.input`
    height: 100%;
    width: 100%;
    border: 1px solid #333;
    text-align: center;
    font-family: inherit;
`
