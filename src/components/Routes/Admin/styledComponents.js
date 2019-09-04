import styled from 'styled-components'
import { NavLink as link } from 'react-router-dom'
export let Main = styled.main`
    height: 100vh;
    width: 100%;
`
export let Header = styled.header`
    width: 100%;
    display: flex;
    border-bottom: 2px solid black;
    padding: 0 20px;
    height: 50px;
    display: flex;
    align-items: baseline;
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
    position: relative;

    font-size: 0.8rem;
    color: inherit;
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
