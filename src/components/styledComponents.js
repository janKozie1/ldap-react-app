import styled, { createGlobalStyle, keyframes } from 'styled-components'
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
    animation: ${shake()} 0.5s ease-in-out 0.2s;
`

export let Message = styled(Error)`
    color:${colors.font};
`

function shake() {
    return keyframes`
        0%{
            transform:translateX(0)
        }
        50%{
            transform:translateX(20%)
        }
        75%{
            transform:translateX(-18.5%)
        }
        87.5%{
            transform:translateX(12.5%);
        }
        95%{
            transform:translateX(-6%);
        }
        100%{
            transform:translateX(0)
        }
    `
}
