import styled from 'styled-components'
import {colors} from '../../cssVariables'
export let Input = styled.input`
    width:100%;
    padding:10px;
  
    font-family:inherit;
    color:${colors.font};

    border:1px solid rgba(0,0,0,0.5);
    border-right:0;
    border-radius:5px 0 0 5px;
    
    &::placeholder{
        text-transform:capitalize;
    }
    &:focus{
        outline:none;
        border-color:${colors.main}
    }

`