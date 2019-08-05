import styled from 'styled-components'
import {sizes,colors} from '../cssVariables'
export let DataList = styled.ul`
    margin:0;
    padding:0;
    list-style-type:none;
    max-width:80%;
    min-width:50%;
    margin:calc(${sizes.margins.formMargin} * 1) 0;

`

export let DataHeader = styled.li`
    max-width:100%;
    word-break:break-all;
    font-size:13px;
    padding:13px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:15px;
    color:white;
    background:${colors.main};
    border-radius:5px 5px 0 0 ;
    grid-column-gap:2em;
    display:grid;
    grid-template-columns:auto 73px;
 
`
export let HeaderItem = styled.p`
    margin:0;
    
`
