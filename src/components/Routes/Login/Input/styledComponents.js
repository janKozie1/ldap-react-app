import styled, { css } from 'styled-components'
import { ReactComponent as usernameIcon } from '../../../../assets/username.svg'
import { ReactComponent as passwordIcon } from '../../../../assets/password.svg'

export let Label = styled.label`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 20px;
    width: 100%;
`

export let IconContainer = styled.div`
    height: 41px;
    width: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
`
export let Username = styled(usernameIcon)`
    height: 24px;
    width: 24px;
`
export let Password = styled(passwordIcon)`
    height: 24px;
    width: 24px;
`

export let Placeholder = styled.p`
    position: absolute;
    margin: 0;
    left: 0;
    bottom: 10px;
    background: white;
    transition: transform 0.3s, font-size 0.3s;
    font-size: 1rem;
    ${({ shouldBeUp }) =>
        shouldBeUp &&
        css`
            transform: translateY(-25px);
            font-size: 0.6rem;
        `}
`

export let Input = styled.input`
    padding: 10px 40px 5px 0;
    width: 100%;
    outline: none;
    border: 0;
    border-bottom: 2px solid #333;
    font-family: inherit;
    color: #333;
    font-size: 1rem;
    ${({ type }) =>
        type === 'password' &&
        css`
            font-size: 1.2rem;
        `}
`
