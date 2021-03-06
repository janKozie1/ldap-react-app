import React, { useState } from 'react'

import CheckBox from './Checkbox'
import DataItem from './DataItem'

import { sortByKey } from 'logic/functions/parsing'

import * as S from './styledComponents'

const DataDisplay = ({
    data = [],
    handleRowInteraction,
    toggleCheckAll,
    userActionButtons,
    selectedCount,
    editable,
    editFunction
}) => {
    let [sortKey, setSortKey] = useState('folderPath')
    let [sortDirection, setSortDirection] = useState(1)
    let handleCheck = data => {
        handleRowInteraction(data, 'check')
    }
    let sortedData = sortByKey(data, sortKey, sortDirection)
    let handleSortChange = key => {
        if (sortKey !== key) {
            setSortKey(key)
            setSortDirection(0)
        } else {
            setSortDirection(sortDirection ? 0 : 1)
        }
    }
    let handleEdit = (group_ID, folder_ID) => {
        editFunction(
            data.find(e => e.group_ID === group_ID && folder_ID === e.folder_ID)
        )
    }
    return (
        <>
            <S.ActionButtons>
                {userActionButtons.map((e, i) => {
                    return (
                        <S.UserButton
                            key={`${i}-button`}
                            value={e.value}
                            onClick={e.func}>
                            {e.text}
                        </S.UserButton>
                    )
                })}
            </S.ActionButtons>
            <S.DataList>
                <S.Cell>
                    <CheckBox
                        size={16}
                        clickHandler={toggleCheckAll}
                        returnData={'check'}
                        checked={selectedCount === data.length}
                    />
                </S.Cell>
                <S.HeaderItem
                    onClick={() => handleSortChange('folderPath')}
                    value={'folderPath'}
                    sortKey={sortKey}
                    direction={sortDirection}>
                    Ścieżka
                    <S.DirIndicator />
                </S.HeaderItem>
                <S.HeaderItem
                    onClick={() => handleSortChange('ownersCount')}
                    value={'ownersCount'}
                    sortKey={sortKey}
                    direction={sortDirection}>
                    Właścicieli
                    <S.DirIndicator />
                </S.HeaderItem>
                <S.HeaderItem
                    onClick={() => handleSortChange('groupType')}
                    value={'groupType'}
                    sortKey={sortKey}
                    direction={sortDirection}>
                    Typ gr.
                    <S.DirIndicator />
                </S.HeaderItem>
                <S.HeaderItem
                    onClick={() => handleSortChange('membersCount')}
                    value={'membersCount'}
                    sortKey={sortKey}
                    direction={sortDirection}>
                    Członków
                    <S.DirIndicator />
                </S.HeaderItem>
                <S.Cell />
                {sortedData.map((e, i) => {
                    return (
                        <React.Fragment key={`${e.group_ID}-${e.folder_ID}`}>
                            <S.Cell>
                                <CheckBox
                                    clickHandler={handleCheck}
                                    returnData={{
                                        g_id: e.group_ID,
                                        f_id: e.folder_ID
                                    }}
                                    checked={e.check}
                                    size={12}
                                />
                            </S.Cell>
                            <DataItem
                                data={e}
                                handleRowInteraction={handleRowInteraction}
                                index={i}
                                editable={editable}
                                handleEdit={handleEdit}
                            />
                        </React.Fragment>
                    )
                })}
            </S.DataList>
        </>
    )
}

export default DataDisplay
