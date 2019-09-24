import React from 'react'

import * as S from './styledComponents'

const DataItem = React.memo(
    ({
        data: {
            folderPath,
            group_ID,
            groupType,
            members,
            open,
            owners,
            folder_ID
        },
        index,
        editable,
        handleRowInteraction,
        handleEdit
    }) => {
        let handleOpen = () => {
            handleRowInteraction({ g_id: group_ID, f_id: folder_ID }, 'open')
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
                {editable ? (
                    <S.Edit onClick={() => handleEdit(group_ID, folder_ID)}>
                        {editable && <S.EditIcon />}
                    </S.Edit>
                ) : (
                    <div></div>
                )}

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
        return (
            a.data.open === b.data.open &&
            a.index === b.index &&
            b.data.owners === a.data.owners
        )
    }
)

export default DataItem
