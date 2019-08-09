import React, { useState } from 'react';
import CheckBox from '../Checkbox/Checkbox'

import { Cell } from '../styledComponents'

import * as S from './styledComponents'



let DataItem = React.memo(({ data: { path, ID, groupType, members, open, owners }, index, handleRowInteraction }) => {
    console.log('rere')
    let handleOpen = () => {
        handleRowInteraction(ID,'open')
    }
    return (
        <>
            <S.UserInteraction row={index * 2 + 3} onClick={handleOpen} />
            <S.Header>
                {path}
                <S.Owners>
                    Właścicieli: {owners.length}
                </S.Owners>
            </S.Header>
            <S.GroupType groupType={groupType}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={open} >
                <S.Expand />
                {members.length}
            </S.MembersInfo>
            <S.MembersList>
                {
                    open && members.map(({ description, cn }) => {
                        return <S.Member key={cn}>{description} - {cn}</S.Member>
                    })
                }
            </S.MembersList>
        </>

    )
},(a,b)=>{
    return a.data.open === b.data.open;    
})



export default DataItem;