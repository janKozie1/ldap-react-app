import styled from 'styled-components'
import { colors } from '../../cssVariables'

export let DataItem = styled.li`
    max-width:100%;
    word-break:break-all;
    font-size:13px;
    padding:10px 10px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    color:${colors.font};
    display:grid;
    grid-column-gap:2em;
    grid-template-columns:auto 110px;
    &:last-of-type{
        border-bottom:none;
    }
`

export let Header = styled.h3`
    font-size:10px;
    margin:0;
`

export let MembersInfo = styled.div`
    width:100%;
    text-align:right;
    font-size:12px;
    
`
