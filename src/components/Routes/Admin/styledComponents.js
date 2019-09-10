import styled from 'styled-components'
import { NavLink as link } from 'react-router-dom'
import { ReactComponent as f } from '../../../assets/find.svg'
import { ReactComponent as h } from '../../../assets/history.svg'
import { ReactComponent as a } from '../../../assets/add.svg'
export let Main = styled.main`
    height: 100vh;
    width: 100%;
`
export let Header = styled.header`
    width: 100%;
    display: flex;
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.font};
    padding: 0 20px;
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
`

export let Title = styled.h2`
    font-size: 1rem;
    font-weight: normal;
`

export let Nav = styled.nav`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 80px;
    margin-left: 80px;
    height: 100%;
`

export let Link = styled(link)`
    text-decoration: none;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    font-size: 0.8rem;
    color: inherit;
    &::after {
        width: 120%;
        position: absolute;
        content: '';
        height: 2px;
        left: 50%;
        bottom: -1px;
        background: ${({ theme: { colors } }) => colors.main};
        opacity: 1;
        transform: translate(-50%, 50%) scaleX(0);
        transition: transform 0.3s;
    }
    &:hover {
        &::after {
            transform: translate(-50%, 50%) scaleX(1);
        }
    }
    &.active {
        color: ${({ theme: { colors } }) => colors.main};
        &::after {
            transform: translate(-50%, 50%) scaleX(1);
        }
        svg path {
            fill: ${({ theme: { colors } }) => colors.main};
        }
    }
`
export let SearchIcon = styled(f)`
    height: 18px;
    margin-right: 10px;
    fill: ${({ theme: { colors } }) => colors.font};
`
export let HistroyIcon = styled(h)`
    height: 18px;
    margin-right: 10px;
    fill: ${({ theme: { colors } }) => colors.font};
`
export let AddIcon = styled(a)`
    height: 18px;
    margin-right: 10px;
    fill: ${({ theme: { colors } }) => colors.font};
`

export let Logout = styled.button`
    background: #333;
    color: white;
    border: 0;
    padding: 0 20px;
    height: 100%;
    margin-left: auto;
    margin-right: 0;
    font-family: inherit;
    border: 2px solid #333;
    border-width: 0 2px;
    cursor: pointer;
    transition: 0.5s color, 0.5s background;
    &:hover {
        color: #333;
        background: white;
    }
`
export let Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
