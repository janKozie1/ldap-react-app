import styled, { createGlobalStyle } from 'styled-components'
import { sizes } from './cssVariables'

export let GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
    html{   
        width:100%;

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