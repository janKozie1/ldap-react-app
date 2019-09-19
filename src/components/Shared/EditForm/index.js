import React, { useState } from 'react'

import * as S from './styledComponents'
import Select from '../Select'

const options = [{ text: 'lola', _id: 1 }, { text: 'lola2', _id: 2 }]

const EditForm = ({ data, stopEditing }) => {
    let [path, setPath] = useState(data.folderPath)
    let [groupName, setGroupName] = useState(data.groupName)
    let [owners, setOwners] = useState(data.owners)
    let [current, setCurrent] = useState(options[0])
    let handleSelect = obj => {
        setCurrent(obj)
    }
    return (
        <S.Form onClick={e => e.stopPropagation()}>
            <S.Header>
                Edytuj
                <S.CloseIcon onClick={stopEditing} />
            </S.Header>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Input
                    type='text'
                    value={path}
                    onChange={({ target: { value } }) => setPath(value)}
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.Input
                    type='text'
                    value={groupName}
                    onChange={({ target: { value } }) => setGroupName(value)}
                />
            </S.Label>
            <S.SelectLabel as='div'>
                <S.LabelTitle>Właśc.</S.LabelTitle>
                <S.Table>
                    {owners.map(e => {
                        return (
                            <React.Fragment key={`${e.user_ID}-${e.roleType}`}>
                                <p>{e.userFullName}</p>
                                <p>{e.user_ID}</p>
                                <p>
                                    {e.roleType} <S.Delete />
                                </p>
                            </React.Fragment>
                        )
                    })}
                    <S.Users>
                        <Select
                            options={options}
                            current={current}
                            selectFunction={handleSelect}
                            width='100%'
                            height='34px'
                            border='0'
                        />
                    </S.Users>
                    <S.RoleType></S.RoleType>
                </S.Table>
            </S.SelectLabel>
            <S.Submit>Zapisz</S.Submit>
        </S.Form>
    )
}

export default EditForm
