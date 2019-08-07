import React, { useState, useEffect } from 'react'
import CheckBox from './Checkbox/Checkbox'
import DataItem from './DataItem/DataItem'
import { sortByKey, arrToObject } from '../../logic/functions'
import * as S from './styledComponents'


let DataDisplay = React.memo(({ data = [] }) => {
    let [sortKey, setSortKey] = useState('path')
    let [sortDirection, setSortDirection] = useState(1);
    let [rowData, setRowData] = useState(null)
    let [sortedData,setSortedData] = useState(null);
    useEffect(()=>{
        setRowData(arrToObject(data, { check: false, open: false }, 'ID'))
        setSortedData(sortByKey(data.map(e => {
            return {
                ...e,
                members: sortByKey(e.members, 'description', 0)
            }
        }), sortKey, sortDirection))
    },[data])
    useEffect(()=>{
        setSortedData(sortByKey(data.map(e => {
            return {
                ...e,
                members: sortByKey(e.members, 'description', 0)
            }
        }), sortKey, sortDirection))
    },[sortKey,sortDirection])


    let handleSortChange = (key) => {
        if (sortKey !== key) {
            setSortKey(key)
            setSortDirection(0)
        } else {
            setSortDirection(sortDirection ? 0 : 1)
        }
    }
    let handleRowInteraction = (id, type) => {
        let newRowData = { ...rowData }
        newRowData[id][type] = !newRowData[id][type]
        setRowData(newRowData)
    }

    let changeAll = (type) => {
        let newRowData = Object.entries(rowData);
        console.log(newRowData)
        if(newRowData.map(e=>e[1][type]).filter(e=>!e).length){
            //at least one false
            console.log("at least one false")
        }else{
            //no false
            console.log("no false")
        }
    }
    return (
        <S.DataList>
            <S.Cell>
                <CheckBox
                    size={16}
                    clickHandler={changeAll}
                    returnData={'check'}
                />
            </S.Cell>
            <S.HeaderItem
                onClick={() => handleSortChange('path')}
                value={'path'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Ścieżka
                <S.DirIndicator />
            </S.HeaderItem>
            <S.HeaderItem
                onClick={() => handleSortChange('groupType')}
                value={'groupType'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Typ gr.
                <S.DirIndicator />

            </S.HeaderItem>
            <S.HeaderItem
                onClick={() => handleSortChange('membersCount')}
                value={'membersCount'}
                sortKey={sortKey}
                direction={sortDirection}
            >
                Członków
                <S.DirIndicator />

            </S.HeaderItem>
            {
              sortedData &&  sortedData.map((e, i) => {
                    return <DataItem
                        key={`${i}-${e.group}`}
                        data={e}
                        rowData={rowData[e.ID]}
                        handleRowInteraction={handleRowInteraction}
                        index={i}
                    />
                })
            }
        </S.DataList>
    )
})

export default DataDisplay;