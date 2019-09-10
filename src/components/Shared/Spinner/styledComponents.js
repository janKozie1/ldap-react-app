import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0%{
        transform:translate(-50%,-50%)
    }
    100%{
        transform:translate(-50%,-50%) rotate(360deg);
    }
`

export const Spinner = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${props => (props.size ? props.size + 'px' : '6px')};
    height: ${props => (props.size ? props.size + 'px' : '6px')};
    background: transparent;
    border-radius: 50%;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-width: ${props => (props.size ? props.size / 4 + 'px' : '2px')};
    border-right-color: ${props => (props.color ? props.color : 'white')};
    animation: ${spin} 1s linear infinite;
`
