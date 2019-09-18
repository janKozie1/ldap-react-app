import styled, { css } from 'styled-components'
import { ReactComponent as arrow } from 'assets/arrow_big.svg'

export const ActionButtons = styled.div`
    grid-column: 1/7;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    width: 100%;
    margin-top: ${({ theme: { sizes } }) => sizes.margins.formMargin};
`

export const UserButton = styled.button`
    cursor: pointer;
    background: white;
    border: 2px solid #333;
    width: 100px;
    &:not(:last-of-type) {
        border-right: 0;
    }
    &:first-of-type {
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
        border-radius: 0 3px 3px 0;
    }
    font-family: inherit;
    padding: 5px 10px;
    font-size: 11px;
`

export const DataList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    width: 80%;
    margin: ${({ theme: { sizes } }) => sizes.margins.formMargin} 0;
    display: grid;
    grid-template-columns: 20px 1fr repeat(4, auto);
    grid-column-gap: 1.5vw;
    grid-auto-rows: auto 39px;
    position: relative;
`
export const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 12px;
    color: ${({ theme: { colors } }) => colors.font};
`
export const Select = styled.div`
    height: 12px;
    width: 12px;
    border: ${({ theme: { defaults } }) => defaults.border};
    border-radius: 2px;
`
export const DirIndicator = styled(arrow)`
    width: 16px;
    height: 16px;
    margin-left: 5px;
    transition: transform 0.5s ease;
    margin-bottom: -1px;
    transform: rotate(180deg);
    > path {
        transition: fill 0.5s ease;
        fill: #ccc;
    }
`

export const HeaderItem = styled.p`
    margin: 0;
    word-break: break-all;
    font-size: 16px;
    color: ${({ theme: { colors } }) => colors.font};
    font-weight: bolder;
    width: 100%;
    cursor: pointer;
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: ${({ theme: { defaults } }) => defaults.border};
    ${props =>
        props.value === props.sortKey &&
        css`
            > svg {
                > path {
                    fill: ${({ theme: { colors } }) => colors.font};
                }
                ${props =>
                    props.direction &&
                    css`
                        transform: rotate(0);
                    `}
            }
        `}
`
