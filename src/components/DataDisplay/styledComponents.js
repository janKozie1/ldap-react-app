import styled,{css} from 'styled-components'
import {sizes,colors, defaults} from '../cssVariables'
import {ReactComponent as arrow} from '../../assets/arrow_big.svg' 


export let UserInteraction = styled.div`
    grid-column:1/5;
    display:flex;
    align-items:center;
    justify-content:center;
    max-width:100%;
    width:100%;
   
    margin-bottom:${sizes.margins.formMargin}; 
`

export let UserButton = styled.button`
    cursor:pointer;
    background:white;
    border:2px solid #333;
    width:100px;
    &:not(:last-of-type){
        border-right:0;
    }
    &:first-of-type{
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type{
        border-radius: 0 3px 3px 0;
    }
    font-family:inherit;
    padding:5px 10px;
    font-size:11px;


`


export let DataList = styled.ul`
    margin:0;
    padding:0;
    list-style-type:none;
    max-width:80%;
    min-width:50%;
    margin:calc(${sizes.margins.formMargin} * 1) 0;
    display:grid;
    grid-template-columns: repeat(4,auto);
    grid-column-gap:1.5vw;
    position:relative;
`
export let Cell = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0;
    font-size:11px;
    color:${colors.font};
`
export let Select = styled.div`
    height:12px;
    width:12px;
    border:${defaults.border};
    border-radius:2px;

`
export let DirIndicator = styled(arrow)`
    width:16px;
    height:16px;
    margin-left:5px;
    transition:transform 0.5s ease;
    margin-bottom:-1px;
    transform:rotate(180deg);
    >path{
        transition:fill 0.5s ease;
        fill:#ccc;
    }
`

export let HeaderItem = styled.p`

    margin:0;
    word-break:break-all;
    font-size:16px;
    color:${colors.font};
    font-weight:bolder;
    width:100%;
    cursor:pointer;
    padding:10px 0;
    display:flex;
    align-items:center;
    border-bottom:${defaults.border};
    ${props => props.value === props.sortKey && css`
        >svg{
            >path{
                fill:${colors.font};
            }
            ${props => props.direction && css`
                transform:rotate(0);
            `}
        }
    `}
`


