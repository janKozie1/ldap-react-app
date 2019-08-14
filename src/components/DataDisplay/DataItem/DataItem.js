import React from 'react';


import * as S from './styledComponents'



let DataItem = React.memo(({ data: { path, ID, groupType, members, open, owners }, index, handleRowInteraction }) => {
    console.log('Data item render')
    let handleOpen = () => {
        handleRowInteraction(ID, 'open')
    }
    return (
        <>
            <S.RowHighlight row={index * 2 + 2} onClick={handleOpen} />
            <S.Header onClick={handleOpen}>
                {path}

            </S.Header>
            <S.Owners onClick={handleOpen}>
                {owners.length}
            </S.Owners >
            <S.GroupType groupType={groupType} onClick={handleOpen}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={open} onClick={handleOpen} >
                <S.Expand />
                {members.length}
            </S.MembersInfo>
            <S.MembersList>
                {
                    open && (
                        <>  
                            <S.ListTitle>Właściciele:</S.ListTitle>
                            <S.ListTitle>Członkowie:</S.ListTitle>
                            <S.UserList>
                                {
                                    owners.map(({ description, cn, Access }) => {
                                        return <S.Owner key={`${cn}-${Access}-owner-${ID}`}>{description} - {cn} - {Access} </S.Owner>
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
   return a.data.open === b.data.open;    
})



export default DataItem;