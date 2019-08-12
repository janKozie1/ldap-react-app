import React, { useState } from 'react';
import CheckBox from '../Checkbox/Checkbox'

import { Cell } from '../styledComponents'

import * as S from './styledComponents'



let DataItem = React.memo(({ data: { path, ID, groupType, members, open, owners }, index, handleRowInteraction }) => {
    console.log(owners)
    let handleOpen = () => {
        handleRowInteraction(ID, 'open')
    }
    return (
        <>
            <S.RowHighlight row={index * 2 + 3} onClick={handleOpen} />
            <S.Header>
                {path}

            </S.Header>
            <S.Owners>
                {owners.length}
            </S.Owners>
            <S.GroupType groupType={groupType}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={open} >
                <S.Expand />
                {members.length}
            </S.MembersInfo>
            <S.MembersList>
                {
                    open && (
                        <>
                            <S.UserList>
                                {
                                    owners.map(({ description, cn, Access }) => {
                                        return <S.Owner key={`${cn}-${Access}-owner`}>{description} - {cn}</S.Owner>
                                    })
                                }
                            </S.UserList>
                            <S.UserList>
                                {
                                    members.map(({ description, cn }) => {
                                        return <S.Member key={`${cn}-member`}>{description} - {cn}</S.Member>
                                    })
                                }

                            </S.UserList>
                        </>
                    )
                }
            </S.MembersList>
        </>

    )
}, (a, b) => {
    // return a.data.open === b.data.open;    
})



export default DataItem;