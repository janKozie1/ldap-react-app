import React from 'react';

import * as S from './styledComponents'

let DataItem = ({data}) => {
    return (
        <S.DataItem >
            <S.Header>
                {data.path}
            </S.Header>
            <S.MembersInfo>
                {data.members.length}
            </S.MembersInfo>
            
        </S.DataItem>
    )
}

export default DataItem;