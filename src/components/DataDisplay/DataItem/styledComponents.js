import styled, { css } from 'styled-components'
import {Cell} from '../styledComponents'
import { ReactComponent as bg } from '../../../assets/arrow.svg'

export let RowHighlight = styled.div`
    position:absolute;
    grid-column:2/6;
    cursor:pointer;
    width:100%;
    z-index:100;
    grid-row:${props => props.row};
    height:36px;
    &:hover{
        background:rgba(50,50,50,0.1);
    }
`

export let Header = styled(Cell)`
    font-weight:bolder;
    justify-content:space-between;
    align-items:center;
    padding:10px 0px;
    white-space: nowrap; 
    overflow:auto;
    &::-webkit-scrollbar{
        display:none;
    }
`

export let Owners = styled(Cell)`
   
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
            transform:rotate3d(0,0,1,180deg);
        }
   `} 
`

export let Expand = styled(bg)`
    width:18px;
    height:18px;
    fill:#333;
    transition:transform 0.5s ease;
   
`

export let MembersList = styled.div`
    grid-column:2/6;
    display:grid;
    grid-template-columns:auto 1fr;
    grid-column-gap:4em;
    margin-left:40px;
    
`

export let ListTitle = styled.h4`
    font-weight:normal;
    padding:0;
    margin:0;
    font-size:11px;
    color:#333;
    font-weight:bolder;
    padding:10px 0px;
`

export let UserList = styled.ul`
    list-style-type:disc;
    padding:0;
    margin:0;
    margin-left:40px;
`
export let Owner = styled.li`
    font-size:11px;
    padding:10px 0;
    position:relative;
    color:#333;
    >span{
        font-size:10px;
        color:#333;
    }
`
export let Member = styled(Owner)`
    color:#666;
    >span{
        color:#666;
    }
`

