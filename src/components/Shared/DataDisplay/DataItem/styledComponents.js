import styled, { css } from 'styled-components'
import { Cell } from '../styledComponents'
import { ReactComponent as bg } from '../../../../assets/arrow.svg'

export const RowHighlight = styled.div`
    position: absolute;
    grid-column: 2/6;
    cursor: pointer;
    width: 100%;
    z-index: 100;
    grid-row: ${props => props.row};
    z-index: 1;
    height: 39px;
    &:hover {
        background: rgba(50, 50, 50, 0.1);
    }
`

export const Header = styled(Cell)`
    font-weight: bolder;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    white-space: nowrap;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const Owners = styled(Cell)``

export const GroupType = styled(Cell)`
    font-weight: bolder;
    color: #4caf50;
    ${props =>
        props.groupType === 'C' &&
        css`
            color: #f44336;
        `}
`

export const MembersInfo = styled(Cell)`
    cursor: pointer;
    justify-content: flex-start;
    ${props =>
        props.isToggled &&
        css`
            svg {
                transform: rotate3d(0, 0, 1, 180deg);
            }
        `}
`

export const Expand = styled(bg)`
    width: 18px;
    height: 18px;
    fill: #333;
    transition: transform 0.5s ease;
`

export const MembersList = styled.div`
    grid-column: 2/6;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 4em;
    margin-left: 40px;
`

export const ListTitle = styled.h4`
    font-weight: normal;
    padding: 0;
    margin: 0;
    font-size: 11px;
    color: #333;
    font-weight: bolder;
    padding: 10px 0px;
`

export const UserList = styled.ul`
    list-style-type: disc;
    padding: 0;
    margin: 0;
    margin-left: 40px;
`
export const Owner = styled.li`
    font-size: 11px;
    padding: 10px 0;
    position: relative;
    color: #333;
    > span {
        font-size: 10px;
        color: #333;
    }
`
export const Member = styled(Owner)`
    color: #666;
    > span {
        color: #666;
    }
`
