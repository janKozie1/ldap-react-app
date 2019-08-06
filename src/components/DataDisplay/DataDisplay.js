import React from 'react'

import DataItem from './DataItem/DataItem'

import * as S from './styledComponents'


let DataDisplay = React.memo(({ data }) => {
    return (
        data  && <S.DataList>
            
            <S.DataHeader>
                <S.HeaderItem>
                    Ścieżka
                </S.HeaderItem>
                <S.HeaderItem>
                    Członków
                </S.HeaderItem>

            </S.DataHeader>
            {
                data && data.map((e, i) => {
                    return <DataItem key={`${i}-${e.group}`} index={i} data={e} />
                })
            }
        </S.DataList>
    )
})

export default DataDisplay;