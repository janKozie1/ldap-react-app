import React, { useState } from 'react'
import CheckBox from './Checkbox/Checkbox'
import DataItem from './DataItem/DataItem'
import { sortByKey } from '../../logic/functions'
import * as S from './styledComponents'


let DataDisplay = React.memo(({ data = [], handleRowInteraction, toggleFieldAll, userActionButtons }) => {
    let [sortKey, setSortKey] = useState('path')
    let [sortDirection, setSortDirection] = useState(1);
    let sortedData = sortByKey(data, sortKey, sortDirection);
    let handleSortChange = (key) => {
        if (sortKey !== key) {
            setSortKey(key)
            setSortDirection(0)
        } else {
            setSortDirection(sortDirection ? 0 : 1)
        }
    }

    return (

        <S.DataList>
            <S.UserInteraction>
                {
                    userActionButtons.map((e, i) => {
                        return <S.UserButton key={`${i}-button`} value={e.value} onClick={e.func}>
                            {e.text}
                        </S.UserButton>
                    })
                }
            </S.UserInteraction>
            <S.Cell>
                <CheckBox
                    size={16}
                    clickHandler={toggleFieldAll}
                    returnData={'check'}
                />
            </S.Cell>
            <S.HeaderItem
                onClick={() => handleSortChange('path')}
                value={'path'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Ścieżka
                <S.DirIndicator />
            </S.HeaderItem>
            <S.HeaderItem
                onClick={() => handleSortChange('groupType')}
                value={'groupType'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Typ gr.
                <S.DirIndicator />

            </S.HeaderItem>
            <S.HeaderItem
                onClick={() => handleSortChange('membersCount')}
                value={'membersCount'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Członków
                <S.DirIndicator />

            </S.HeaderItem>
            {
                sortedData.map((e, i) => {
                    return <DataItem
                        key={`${i}-${e.group}`}
                        data={e}
                        handleRowInteraction={handleRowInteraction}
                        index={i}
                    />
                })
            }
        </S.DataList>

    )
})

export default DataDisplay;