import styled from 'styled-components'

import {sizes,colors} from '../cssVariables'

export let Search = styled.section`
    width:${sizes.breakpoints.mobile};
    margin-top:calc(${sizes.margins.formMargin} * 2);
    display:flex;
    align-items:center;
    flex-direction:column;
    transition:width 0.5s ease; 
    text-align:center;
    @media screen and (max-width:${sizes.breakpoints.mobile}) {
        width:80%;
    }
`
export let FormTitle = styled.h2`
    margin:0;
    color:${colors.font};

`

export let Form = styled.form`
    margin-top:${sizes.margins.formMargin};
    width:80%;
    display:grid;
    grid-template-columns:5fr 1fr;
    grid-row-gap:${sizes.margins.formMargin};      
    align-content:center;
    justify-items:center;

`

export let Submit = styled.button`
    border:0;

    background:${colors.main};
    color:white;
    font-family:inherit;
    font-size:0.8rem;
    width:100%;
    border-radius: 0 5px 5px 0;
    cursor:pointer;
    position:relative;
    &:active{
       box-shadow:  inset 0px 0px 10px 5px rgba(0,0,0,0.35);
       
    }
`

export let SpinnerContainer = styled.div`

`