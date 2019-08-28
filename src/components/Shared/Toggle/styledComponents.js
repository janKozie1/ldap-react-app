import styled, { css } from 'styled-components'
export const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    align-self: center;
    grid-column: 1/3;
`

export const Label = styled.label`
    > input {
        display: none;
    }
    flex: 1;

    &:first-of-type {
        padding-right: 15px;
        text-align: right;
    }
    &:last-of-type {
        padding-left: 15px;
        text-align: left;
    }
`

export const Option = styled.p`
    font-size: 0.65rem;
    cursor: pointer;
`

export const ToggleIndicator = styled.div`
    width: 50px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    &::after {
        position: absolute;
        left: 17px;
        top: 50%;
        width: 14px;
        height: 14px;
        transform: translate(-100%, -50%);
        transition: transform 0.2s ease;
        content: '';
        background: ${({ theme: { colors } }) => colors.main};
        border-radius: 50%;
    }
    ${props =>
        props.selected === 1 &&
        css`
            &::after {
                transform: translate(100%, -50%);
            }
        `}
`
