import styled, { createGlobalStyle } from 'styled-components'
import { sizes, colors } from './cssVariables'

export let GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
    html{   
        width:100%;
        overflow-y: scroll;

    }
    body{
        font-family:'Montserrat',Helvetica; 
        display:flex;
        width:100%;
        margin:0;
        padding:0;
        *, *::after, *::before{
            box-sizing:border-box;
        }
    }
    #root{
        
        width:100%;
    }
`

export let Main = styled.main`
    width:100%;
    margin-top:${sizes.margins.formMargin};
    display:flex;
    align-items:center;
    justify-content:flex-start;
    flex-direction:column;
`

export let Logo = styled.img`
    width:${sizes.breakpoints.mobile};
    @media screen and (max-width:${sizes.breakpoints.mobile}) {
        height:auto;
        width:80%;   
    }
`
export let Error = styled.p`
    color:${colors.error};
    margin-top:${sizes.margins.formMargin};
    font-size:11px;
    font-weight:bolder;
`