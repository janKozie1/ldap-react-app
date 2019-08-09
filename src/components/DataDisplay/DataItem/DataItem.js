import React, { useState } from 'react';
import CheckBox from '../Checkbox/Checkbox'

import { Cell } from '../styledComponents'

import * as S from './styledComponents'



let DataItem = ({ data: { path, ID, groupType, members, check,open }, index, handleRowInteraction }) => {
    let handleCheck = (data) => {
        handleRowInteraction(data,'check')
    }
    console.log('rere')
    return (
        <>
           
            <Cell>
                <CheckBox 
                    clickHandler={handleCheck}
                    returnData={ID}
                    checked={check}
                    size={12}
                />
            </Cell>
            <S.UserInteraction row={index * 2 + 3} onClick={() => handleRowInteraction(ID, 'open')} />
            <S.Header>
                {path}
            </S.Header>
            <S.GroupType groupType={groupType}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={open} >
                <S.Expand />
                {members.length}
            </S.MembersInfo>
            {members ?
                <S.MembersList>
                    {
                        open && members.map(({ description, cn }) => {
                            return <S.Member key={cn}>{description} - {cn}</S.Member>
                        })
                    }
                </S.MembersList>
                : null}

        </>

    )
}



export default DataItem;