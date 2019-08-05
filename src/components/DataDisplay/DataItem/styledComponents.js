import styled, {css} from 'styled-components'
import { colors } from '../../cssVariables'
import {ReactComponent as bg} from '../../../assets/arrow.svg'

export let DataItem = styled.li`
    max-width:100%;
    word-break:break-all;
    font-size:13px;
    padding:0 20px;
    height:40px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    color:${colors.font};
    display:grid;
    grid-column-gap:2em;
    grid-template-columns:auto 73px;
    cursor:pointer;
    position:relative;
    &::before{
        position:absolute;
        left:0%;
        top:0;
        height:100%;
        width:3px;
        background:${colors.main};
        content:'';
        transform-origin:center center;
        transform:scaleY(0);
        transition:transform 0.3s ease;
    }
    &:hover{
        &::before{
            transform:scaleY(1);
        }
    }
    &:last-of-type{
        border-bottom:none;
    }
`

export let Header = styled.h3`
    font-size:10px;
    font-weight:bolder;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin:0;
`

export let MembersInfo = styled.div`
    width:100%;
    height:100%;
    text-align:left;
    font-size:10px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    cursor:pointer;
   
    &:hover{
        color:${colors.main};
        svg{
            fill:${colors.main};
        }
    }
`

export let Expand = styled(bg)`
    width:18px;
    height:18px;
    fill:#333;
    transition:transform 0.5s ease;
    ${props=>props.toggled && css`
        transform:rotate(-180deg);
    `}
`

export let MembersList = styled.li`
    grid-column:1/3;
    margin:0;
    margin-left:20px;
    padding:0;
    list-style-type:none;
`

export let Member = styled.li`
    font-size:10px;
    padding:10px 0;
`