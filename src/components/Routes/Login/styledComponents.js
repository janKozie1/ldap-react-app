import styled from 'styled-components'

export let Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
export let Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 350px;
    height: 500px;
    padding: 40px 40px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.08);
`
export let Header = styled.h3`
    margin: 0;

    font-size: 1.7rem;
`

export let Form = styled.form`
    display: flex;
    margin-top: 80px;

    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`

export let Label = styled.label`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 20px;
    width: 100%;
    > p {
        position: absolute;
        margin: 0;
        left: 15px;
        bottom: 10px;
    }
`

export let Input = styled.input`
    padding: 10px 15px;
    width: 100%;
    border: 2px solid #333;
`

export let MessageBox = styled.div`
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    color: ${({ theme: { colors } }) => colors.error};
    font-size: 0.8rem;
`
export let Button = styled.button`
    background: white;
    border: 0;
    font-family: inherit;
    font-size: 1rem;
    width: max-content;
    padding: 0 20px 5px;
    cursor: pointer;
    position: relative;
    margin-top: auto;
    margin-bottom: 0px;
    &::after {
        content: '';
        height: 2px;
        width: 100%;
        position: absolute;
        background: #333;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%) scaleX(0);
        transition: transform 0.3s;
    }
    &:hover,
    &:active,
    &:focus {
        &::after {
            transform: translateX(-50%) scaleX(1);
        }
    }
`
