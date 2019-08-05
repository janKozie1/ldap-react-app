import React from 'react'

import DataItem from './DataItem/DataItem'

import * as S from './styledComponents'


let DataDisplay = React.memo(({ data }) => {
    console.log(data)
    return (
        data && <S.DataList>
            
            <S.DataHeader>
                <S.HeaderItem>
                    Ścieżka
                </S.HeaderItem>
                <S.HeaderItem>
                    Liczba członków
                </S.HeaderItem>

            </S.DataHeader>
            {
                data && data.map((e, i) => {
                    return <DataItem key={i} data={e} />
                })
            }
        </S.DataList>
    )
})

export default DataDisplay;