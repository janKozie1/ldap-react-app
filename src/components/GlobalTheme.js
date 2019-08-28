import React from 'react'

import { theme } from '../constants/theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

let GlobalStyle = createGlobalStyle`
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
        color:${theme.colors.font};
        *, *::after, *::before{
            box-sizing:border-box;
        }
    }
    #root{
            
            width:100%;
        }
`

const withGlobalTheme = Component => () => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Component />
            </>
        </ThemeProvider>
    )
}

export default withGlobalTheme
