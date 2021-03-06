import styled from 'styled-components'

export const Form = styled.form`
    width: 600px;
    display: flex;
    margin-top: 80px;
    position: relative;
    z-index: 1;
    border: 2px solid #333;
    padding: 20px 40px;
    flex-direction: column;
`

export const Header = styled.h1`
    margin: 0;
    margin-bottom: 40px;
`

export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
    height: 32px;
    &:last-of-type {
        margin-bottom: 40px;
    }
`

export const LabelTitle = styled.p`
    margin: 0;
    margin-right: 20px;
`

export const Input = styled.input`
    border: 2px solid #333;
    height: 100%;
    padding: 0 10px;
    width: 400px;
    font-family: inherit;
`

export const Container = styled.div`
    border: 2px solid #333;
    height: 100%;
    width: 400px;
    font-family: inherit;
`
export let Submit = styled.button`
    background: ${({ theme: { colors } }) => colors.green};
    border: 0;
    height: 100%;
    height: 32px;
    width: 80px;
    font-family: inherit;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    cursor: pointer;
    position: relative;
`

export let Footer = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    align-self: flex-end;
`
export let Message = styled.p`
    margin: 0;
    margin-right: 20px;
    font-size: 0.8rem;
    color: ${({ theme: { colors }, ok }) => (ok ? colors.green : colors.error)};
`
