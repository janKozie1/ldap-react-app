import React, { useState } from 'react';

import * as S from './styledComponents'



let DataItem = ({ data: { path, groupType, members },index }) => {
    let [isToggled, setToggled] = useState(false);
    return (
        <>
            <S.UserInteraction row={index * 2 + 2} onClick={() => setToggled(!isToggled)}/>
            <S.Header>
                {path}
            </S.Header>
            <S.GroupType groupType={groupType}>
                <p>{groupType}</p>
            </S.GroupType>
            <S.MembersInfo isToggled={isToggled} >
                    <S.Expand />
                {members.length}
            </S.MembersInfo>
            {members ?
                <S.MembersList>
                    {isToggled && members.map(({ description, cn }) => {
                        return <S.Member key={cn}>{description} - {cn}</S.Member>
                    })

                    }
                </S.MembersList>
                : null}

        </>

    )
}

export default DataItem;