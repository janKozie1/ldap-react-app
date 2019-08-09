import styled, { css } from 'styled-components'
import {Cell} from '../styledComponents'
import { ReactComponent as bg } from '../../../assets/arrow.svg'

export let UserInteraction = styled.div`
    position:absolute;
    grid-column:2/5;
    cursor:pointer;
    width:100%;
    grid-row:${props => props.row};
    height:36px;
    &:hover{
        background:rgba(50,50,50,0.1);
      
    }
`

export let Header = styled(Cell)`
    font-weight:bolder;
    justify-content:flex-start;
    padding:10px 0px;
    white-space: nowrap; 
    overflow:auto;
    &::-webkit-scrollbar{
        display:none;
    }
`
export let GroupType = styled(Cell)`
    font-weight:bolder;
    color:#F44336;
    ${props => props.groupType === 'C' && css`
        color:#4CAF50; 
    `}
`

export let MembersInfo = styled(Cell)`
    cursor:pointer;
    justify-content:flex-start;
   ${props => props.isToggled && css`
        svg{
            transform:rotate(180deg);
        }
   `} 
`

export let Expand = styled(bg)`
    width:18px;
    height:18px;
    fill:#333;
    transition:transform 0.5s ease;
   
`

export let MembersList = styled.ul`
    grid-column:2/5;
    margin:0;
    margin-left:40px;
    padding:0;
    list-style-type:disc;
    
`

export let Member = styled.li`
    font-size:11px;
    padding:10px 0;
    position:relative;
    color:#666;
    >span{
        font-size:10px;
        color:#666;
    }
`