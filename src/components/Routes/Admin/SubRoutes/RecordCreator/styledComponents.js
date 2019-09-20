import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme: { sizes } }) =>
        css`calc(${sizes.margins.formMargin} * 2)`};
`

export const Type = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    > p {
        margin: 0;
        margin-right: 20px;
    }
`
