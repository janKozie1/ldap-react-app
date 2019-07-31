import styled from 'styled-components'

export let Input = styled.input`
    width:100%;
    padding:10px 20px;
    margin-top:20px;
    
    font-family:inherit;

    border:1px solid rgba(0,0,0,0.5);
    border-radius:3px;
    
    &::placeholder{
        text-transform:capitalize;
    }

`