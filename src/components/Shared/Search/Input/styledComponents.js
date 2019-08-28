import styled from 'styled-components'

export const Input = styled.input`
    width: 100%;

    padding: 10px;
    font-family: inherit;
    color: ${({ theme: { colors } }) => colors.font};

    border: 1px solid rgba(0, 0, 0, 0.3);
    border-right: 0;
    border-radius: 5px 0 0 5px;

    &::placeholder {
        text-transform: capitalize;
    }
    &:focus {
        outline: none;
        border-color: ${({ theme: { colors } }) => colors.main};
    }
`
