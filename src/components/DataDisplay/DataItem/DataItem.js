import React, { useState } from 'react';
import CheckBox from '../Checkbox/Checkbox'

import { Cell } from '../styledComponents'

import * as S from './styledComponents'



let DataItem = ({ data: { path, group, groupType, members }, index, rowData, handleRowInteraction }) => {
    let handleCheck = (id) => {
        handleRowInteraction(id,'check')
    }
    return (
        <>
            <S.UserInteraction row={index * 2 + 2} onClick={() => handleRowInteraction(group, 'open')} />
            <Cell>
                <CheckBox 
                    clickHandler={handleCheck}
                    returnData={group}
                    checked={rowData.check}
                    size={12}
                />
            </Cell>
            <S.Header>
                {path}
            </S.Header>
            <S.GroupType groupType={groupType}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={rowData.open} >
                <S.Expand />
                {members.length}
            </S.MembersInfo>
            {members ?
                <S.MembersList>
                    {
                        rowData.open && members.map(({ description, cn }) => {
                            return <S.Member key={cn}>{description} - {cn}</S.Member>
                        })
                    }
                </S.MembersList>
                : null}

        </>

    )
}



export default DataItem;