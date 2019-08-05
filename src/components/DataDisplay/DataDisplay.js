import React from 'react'

import * as S from './styledComponents'


let DataDisplay = React.memo(({data}) => {
    console.log(data)
    return (
        <S.DataList>
            {
                data && data.map((e,i)=>{
                   return  <S.DataItem key={i}>{e.path}</S.DataItem>
                })
            }
        </S.DataList>
    )
})

export default DataDisplay;