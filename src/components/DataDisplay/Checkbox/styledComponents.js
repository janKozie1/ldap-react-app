import styled, {css} from 'styled-components'

export let Checkbox = styled.div`
    width:${props => props.size ? props.size : 12}px;
    height:${props => props.size ? props.size : 12}px;
    border:2px solid #333;
    border-radius:2px;
    cursor:pointer;
    transition:background 0.5s ease;
    ${props => props.toggled && css`
        background:black;
    `}
`