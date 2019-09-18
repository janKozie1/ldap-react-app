import styled, { css } from 'styled-components'

export const Form = styled.div`
    width: 80%;
    margin-top: ${({ theme: { sizes } }) =>
        css`calc(${sizes.margins.formMargin} * 2)`};
`
