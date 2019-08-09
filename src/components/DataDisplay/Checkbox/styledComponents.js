import styled, {css} from 'styled-components'

import {defaults} from '../../cssVariables'

export let Checkbox = styled.div`
    width:${props => props.size ? props.size : 12}px;
    height:${props => props.size ? props.size : 12}px;
    border:${defaults.border};
    border-radius:2px;
    cursor:pointer;
    ${props => props.checked && css`
        background:#333;
    `}
`