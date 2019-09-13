import React from 'react'

import * as S from './styledComponents'

const DataItem = React.memo(
    ({
        data: { folderPath, group_ID, groupType, members, open, owners },
        index,
        handleRowInteraction
    }) => {
        let handleOpen = () => {
            handleRowInteraction(group_ID, 'open')
        }
        return (
            <>
                <S.RowHighlight row={index * 2 + 2} onClick={handleOpen} />
                <S.Header onClick={handleOpen}>{folderPath}</S.Header>
                <S.Owners onClick={handleOpen}>{owners.length}</S.Owners>
                <S.GroupType groupType={groupType} onClick={handleOpen}>
                    <p>{groupType}</p>
                </S.GroupType>
                <S.MembersInfo isToggled={open} onClick={handleOpen}>
                    <S.Expand />
                    {members.length}
                </S.MembersInfo>
                <S.MembersList>
                    {open && (
                        <>
                            <S.ListTitle>Właściciele:</S.ListTitle>
                            <S.ListTitle>Członkowie:</S.ListTitle>
                            <S.UserList>
                                {owners.map(
                                    ({ userFullName, user_ID, roleType }) => {
                                        return (
                                            <S.Owner
                                                key={`${user_ID}-${roleType}-${group_ID}`}>
                                                {userFullName} - {user_ID} -{' '}
                                                {roleType}{' '}
                                            </S.Owner>
                                        )
                                    }
                                )}
                            </S.UserList>

                            <S.UserList>
                                {members.map(({ description, cn }) => {
                                    return (
                                        <S.Member key={`${cn}-member`}>
                                            {description} - {cn}
                                        </S.Member>
                                    )
                                })}
                            </S.UserList>
                        </>
                    )}
                </S.MembersList>
            </>
        )
    },
    (a, b) => {
        return a.data.open === b.data.open && a.index === b.index
    }
)

export default DataItem
