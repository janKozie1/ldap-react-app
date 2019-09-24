import React, { useState } from 'react'

import withProtectedRoute from 'components/HOC/ProtectedRoute'
import { useStateValue } from 'logic/store'

import Select from 'components/Shared/Select'

import UserRemover from './UserRemover'
import RelationRemover from './RelationRemover'
import GroupRemover from './GroupRemover'
import FolderRemover from './FolderRemover'

import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const OPTIONS = [
    {
        text: 'Użytkownik',
        _id: 'user'
    },
    {
        text: 'Folder',
        _id: 'folder'
    },
    {
        text: 'Grupa',
        _id: 'group'
    },
    {
        text: 'Relacja',
        _id: 'relation'
    }
]

const RecordRemover = () => {
    let [{ token }] = useStateValue()
    let [current, setCurrent] = useState(OPTIONS[0])
    let [loading, setLoading] = useState(false)
    let [response, setResponse] = useState({})
    let onSubmit = async data => {
        setLoading(true)
        let res = await fetch(`${BASE_URL}/update/delete/${current._id}`, {
            ...DEF_PARAMS,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        })
        let { ok, msg } = await res.json()
        setTimeout(() => {
            setLoading(false)
            setResponse({ ok, msg })
        }, 300)
    }
    let handleSelect = obj => {
        setResponse({})
        setCurrent(obj)
    }

    let getForm = () => {
        let props = { response, loading, onSubmit }
        switch (current._id) {
            case 'group':
                return <GroupRemover {...props} />
            case 'relation':
                return <RelationRemover {...props} />
            case 'folder':
                return <FolderRemover {...props} />
            case 'user':
            default:
                return <UserRemover {...props} />
        }
    }
    return (
        <S.Container>
            <S.Type>
                <Select
                    options={OPTIONS}
                    current={current}
                    selectFunction={handleSelect}
                    width={'150px'}
                />
            </S.Type>
            {getForm()}
        </S.Container>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(RecordRemover)
