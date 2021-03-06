import styled, { keyframes, css } from 'styled-components'

export let Container = styled.div`
    transform: translateX(25%);
    transition: transform 0.5s;
    ${({ isEditing }) =>
        isEditing &&
        css`
            transform: translateX(-25%);
        `}
    overflow: hidden;
    display: grid;
    grid-template-columns: 100vw 100vw;
`
export let Data = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export let Cover = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 5;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`

export let EditPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 6;
    background: white;
`

export let Error = styled.p`
    color: ${({ theme: { colors } }) => colors.error};
    margin-top: ${({ theme: { sizes } }) => sizes.margins.formMargin};
    font-size: 11px;
    font-weight: bolder;
    animation: ${shake()} 0.5s ease-in-out 0.2s;
`

export let Message = styled(Error)`
    color: ${({ theme: { colors } }) => colors.font};
`

function shake() {
    return keyframes`
        0%{
            transform:translateX(0)
        }
        20%{
            transform:translateX(16%)
        }
        40%{
            transform:translateX(-14%)
        }
        60%{
            transform:translateX(10%);
        }
        80%{
            transform:translateX(-6%);
        }
        100%{
            transform:translateX(0)
        }
    `
}
