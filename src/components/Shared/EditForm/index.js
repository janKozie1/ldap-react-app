import React, { useState } from 'react'

import * as S from './styledComponents'

const EditForm = ({ data, stopEditing }) => {
    let [path, setPath] = useState(data.folderPath)
    let [groupName, setGroupName] = useState(data.groupName)
    let [owners, setOwners] = useState(data.owners)
    console.log(owners)
    console.log(path, groupName)
    return (
        <S.Form onClick={e => e.stopPropagation()}>
            <S.CloseIcon onClick={stopEditing} />
            <S.Header>Edytuj</S.Header>
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
            <S.Label>
                <S.LabelTitle>Właśc.</S.LabelTitle>
                <S.Table>
                    {owners.map(e => {
                        return (
                            <React.Fragment key={`${e.user_ID}-${e.roleType}`}>
                                <p>{e.userFullName}</p>
                                <p>{e.user_ID}</p>
                                <p>{e.roleType}</p>
                            </React.Fragment>
                        )
                    })}
                </S.Table>
            </S.Label>
        </S.Form>
    )
}

export default EditForm
