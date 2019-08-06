import React, { useState } from 'react';



import * as S from './styledComponents'



let DataItem = ({ data:{path,groupType,members}, index }) => {
    let [isToggled, setToggled] = useState(false);
    return (
        <>
            <S.DataItem offset={index} onClick={() => setToggled(!isToggled)}>
                <S.Header data-type={groupType} type={groupType}>
                    {path}
                </S.Header>
                <S.MembersInfo isToggled={isToggled}>
                    <S.Expand />
                    {members.length}
                </S.MembersInfo>
            </S.DataItem>
            {members ?
                <S.MembersList>
                    {isToggled && members.map(({description, cn}) => {
                        return <S.Member key={cn}>{description} - {cn}</S.Member>
                    })

                    }
                </S.MembersList>
                : null}

        </>

    )
}

export default DataItem;