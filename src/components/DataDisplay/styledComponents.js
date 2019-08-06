import styled,{css} from 'styled-components'
import {sizes,colors} from '../cssVariables'
import {ReactComponent as arrow} from '../../assets/arrow_big.svg' 
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
    padding:13px 30px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:15px;
    color:white;
    background:${colors.main};
    border-radius:5px 5px 0 0 ;
    grid-column-gap:2em;
    display:grid;
    grid-template-columns:auto 73px;
 
`
export let DirIndicator = styled(arrow)`
    width:14px;
    visibility:hidden;
    height:16px;
    transition:transform 0.5s ease;
    >path{
        fill:white;
    }
`

export let HeaderItem = styled.p`
    margin:0;
    cursor:pointer;
    width:max-content;
    ${props => props.value === props.sortKey && css`
        >svg{
            visibility:visible;
            ${props => props.direction && css`
                transform:rotate(180deg);
            `}
        }
    `}
`


