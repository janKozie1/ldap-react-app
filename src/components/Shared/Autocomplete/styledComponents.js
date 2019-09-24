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
    display: ${({ isVisible }) => (isVisible ? 'grid' : 'none')};
    position: absolute;
    left: -2px;
    top: calc(100% + 2px);
    width: calc(100% + 4px);

    border-top: 0;
    overflow-x: hidden;
    max-height: calc(${({ maxRows, height }) => `${maxRows} * ${height}`});
    background: white;
    z-index: 12;
`

export const Option = styled.div`
    cursor: pointer;
    padding: 8px 15px;
    height: 34px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 10;
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`

export const Text = styled.p`
    white-space: nowrap;
    overflow: hidden; /* "overflow" value must be different from "visible" */
    text-overflow: ellipsis;
    width: ${({ width }) => width};
    direction: rtl;
    text-align: left;
`
