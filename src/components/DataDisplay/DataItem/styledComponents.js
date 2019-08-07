import styled, { css } from 'styled-components'
import { colors } from '../../cssVariables'
import { ReactComponent as bg } from '../../../assets/arrow.svg'

export let UserInteraction = styled.div`
    position:absolute;
    grid-column:1/4;
    cursor:pointer;
    width:100%;
    grid-row:${props => props.row};
    height:33px;
    &::before{
        position:absolute;
        left:0%;
        top:0;
        height:100%;
        width:3px;
        background:${colors.main};
        content:'';
        transform-origin:bottom center;
        transform:scaleY(0);
        transition:transform 0.3s ease;
    }
    &:hover{
        &::before{
            transform:scaleY(1);
        }
    }
    
`


let Cell = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin:0;
    font-size:10px;
    color:${colors.font};
    
`

export let Header = styled(Cell)`
    font-weight:bolder;
    padding:10px 0px;
    padding-left:10px;
    white-space: nowrap; 
    overflow:auto;
    &::-webkit-scrollbar{
        display:none;
    }
`
export let GroupType = styled(Cell)`
    font-weight:bolder;
    color:#F44336;
    justify-content:center;
    ${props => props.groupType === 'C' && css`
        color:#4CAF50; 
    `}
`

export let MembersInfo = styled(Cell)`
    cursor:pointer;
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
    grid-column:1/4;
    margin:0;
    margin-left:40px;
    padding:0;
    list-style-type:disc;
    
`

export let Member = styled.li`
    font-size:10px;
    padding:10px 0;
    position:relative;
    >span{
        font-size:10px;
        color:#666;
    }
`