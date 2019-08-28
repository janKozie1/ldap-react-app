import styled, { keyframes, css } from 'styled-components'

export let Main = styled.main`
    width: 100%;
    margin-top: ${({ theme: { sizes } }) => sizes.margins.formMargin};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`

export let Logo = styled.img`
    ${({ theme: { sizes } }) => css`
        width: ${sizes.breakpoints.mobile};
        @media screen and (max-width: ${sizes.breakpoints.mobile}) {
            height: auto;
            width: 80%;
        }
    `}
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
