import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export const Input = styled.input`
    width: 100%;
    height: 100%;
    font-family: inherit;
    border: 0;
    padding: 8px 15px;
    color: #333;
`

export const Options = styled.div`
    display: grid;
    position: absolute;
    left: -2px;
    top: calc(100% + 2px);
    width: calc(100% + 4px);
    border: 1px solid #ddd;
    border-top: 0;
    overflow-x: hidden;
    max-height: calc(${({ maxRows, height }) => `${maxRows} * ${height}`});
    background: white;
`

export const Option = styled.div`
    cursor: pointer;
    padding: 8px 15px;
    height: 34px;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`
