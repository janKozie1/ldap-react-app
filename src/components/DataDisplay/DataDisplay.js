import React,{useState} from 'react'

import DataItem from './DataItem/DataItem'
import {sortByKey} from '../../logic/functions'
import * as S from './styledComponents'


let DataDisplay = React.memo(({ data = [] }) => {
    let [sortKey, setSortKey] = useState('membersCount')
    let [sortDirection, setSortDirection] = useState(0)
    let sortedData = sortByKey(data.map(e => {
       return {...e, members:sortByKey(e.members,'description',0)}
    }),sortKey,sortDirection);
    let handleSortChange = (key) =>{
        if(sortKey !== key){
            setSortKey(key)
            setSortDirection(0)
        }else{
            setSortDirection(sortDirection ? 0 : 1)
        }
    }
    return (
        <S.DataList>
            
            <S.DataHeader>
                <S.HeaderItem 
                    onClick={()=>handleSortChange('path')}
                    value={'path'} 
                    sortKey={sortKey}
                    direction={sortDirection}
                >
                        Ścieżka
                    <S.DirIndicator />
                </S.HeaderItem>
                <S.HeaderItem 
                    onClick={()=>handleSortChange('membersCount')}
                    value={'membersCount'} 
                    sortKey={sortKey} 
                    direction={sortDirection}
                >
                        Członków
                    <S.DirIndicator />
                </S.HeaderItem>

            </S.DataHeader>
            {
                sortedData.map((e, i) => {
                    return <DataItem key={`${i}-${e.group}`} index={i} data={e} />
                })
            }
        </S.DataList>
    )
})

export default DataDisplay;