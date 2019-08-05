import React, { useState } from 'react';

import * as S from './styledComponents'

let DataItem = ({ data }) => {
    let [isToggled, setToggled] = useState(false);
    return (
        <>
            <S.DataItem   onClick={() => setToggled(!isToggled)}>
                <S.Header>
                    {data.path}
                </S.Header>
                <S.MembersInfo>
                    <S.Expand isToggled={isToggled}/>
                    {data.members.length}
                </S.MembersInfo>
            </S.DataItem>
            {data.members ? 
             <S.MembersList>
                {isToggled && data.members.map((e, i) => {
                    console.log(e)
                    return <S.Member key={e.cn}>{e.description}</S.Member>
                })
                    
                }
            </S.MembersList>
            : null}
           
        </>

    )
}

export default DataItem;