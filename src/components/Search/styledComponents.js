import styled from 'styled-components'

import {sizes} from '../cssVariables'

export let Search = styled.section`
    width:${sizes.breakpoints.mobile};
    margin-top:90px;
    display:flex;
    align-items:center;
    flex-direction:column;
    transition:width 0.5s ease; 
    text-align:center;
    @media screen and (max-width:${sizes.breakpoints.mobile}) {
        width:80%;
    }
`


export let Form = styled.form`
    width:60%;
    display:flex;
    justify-content:center;
    flex-direction:column;
`

export let Submit = styled.button`
    margin-top:40px;
    border:0;
    padding:15px 20px;   
`