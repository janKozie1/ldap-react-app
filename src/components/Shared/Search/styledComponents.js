import styled, { css } from 'styled-components'

export const Search = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: width 0.5s ease;
    text-align: center;
    ${({ theme: { sizes } }) => css`
        width: ${sizes.breakpoints.mobile};
        margin-top: calc(${sizes.margins.formMargin} * 2);
        @media screen and (max-width: ${sizes.breakpoints.mobile}) {
            width: 80%;
        }
    `}
`
export const FormTitle = styled.h2`
    margin: 0;
    color: ${({ theme: { colors } }) => colors.font};
`

export const Form = styled.form`
    width: 80%;
    display: grid;
    grid-template-columns: 5fr 1fr;
    align-content: center;
    justify-items: center;
    ${({ theme: { sizes } }) => css`
        margin-top: ${sizes.margins.formMargin};
        grid-row-gap: ${sizes.margins.formMargin};
    `}
`

export const Submit = styled.button`
    border: 0;
    outline: 0;
    background: ${({ theme: { colors } }) => colors.main};
    color: white;
    font-family: inherit;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
        box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`

export const SpinnerContainer = styled.div`
    width: 30px;
    height: 30px;
`
