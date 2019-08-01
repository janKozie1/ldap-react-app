import styled,{css} from 'styled-components'
import {colors} from '../cssVariables'
export let ToggleContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:200px;
    align-self:center;
    grid-column:1/3;
`

export let Label = styled.label`
    >input{
       display:none;
    }
    flex:1;
    
    &:first-of-type{
        padding-right:20px;
        text-align:right;
    }
    &:last-of-type{
        padding-left:20px;
        text-align:left;
    }
    
`

export let Option = styled.p`
    font-size:0.5rem;
    padding:5px;
    cursor:pointer;
    
`


export let ToggleIndicator = styled.div`

    width:50px;
    height:20px;
    border:1px solid rgba(0,0,0,0.4);
    border-radius:15px;
    position:relative;
    cursor:pointer;
   
    &::after{
        position:absolute;
        left:17px; 
        top:50%;
        width:14px;
        height:14px;
        transform:translate(-100%,-50%);
        transition:transform 0.2s ease;
        content:'';
        background:${colors.main};
        border-radius:50%;
    }
    ${props => props.selected == 1 && css`
        &::after{
            transform:translate(100%,-50%)
        }   
    `}
`
