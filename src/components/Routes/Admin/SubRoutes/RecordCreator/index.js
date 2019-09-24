import React, { useState } from 'react'

import withProtectedRoute from 'components/HOC/ProtectedRoute'
import { useStateValue } from 'logic/store'

import Select from 'components/Shared/Select'
import Form from './Form'
import GroupForm from './GroupForm'

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
const fields = {
    user: [
        {
            text: 'ID',
            id: 'userID'
        },
        {
            text: 'Imię',
            id: 'firstName'
        },
        {
            text: 'Nazwisko',
            id: 'surname'
        },
        {
            text: 'Biuro',
            id: 'office'
        }
    ],
    folder: [
        {
            text: 'Ścieżka',
            id: 'folderPath'
        },
        {
            text: 'Lokalizacja',
            id: 'location'
        }
    ],
    group: [
        {
            text: 'Grupa',
            id: 'group'
        }
    ]
}

const RecordCreator = () => {
    let [{ token }] = useStateValue()
    let [current, setCurrent] = useState(OPTIONS[0])
    let [loading, setLoading] = useState(false)
    let [response, setResponse] = useState({})
    let onSubmit = async data => {
        setLoading(true)
        let res = await fetch(`${BASE_URL}/update/add/${current._id}`, {
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
    return (
        <S.Container>
            <S.Type>
                <p>Nowy: </p>
                <Select
                    options={OPTIONS}
                    current={current}
                    selectFunction={handleSelect}
                    width={'150px'}
                />
            </S.Type>
            {current._id === 'relation' ? (
                <GroupForm
                    loading={loading}
                    response={response}
                    onSubmit={onSubmit}
                />
            ) : (
                <Form
                    loading={loading}
                    response={response}
                    onSubmit={onSubmit}
                    fields={fields[current._id]}
                />
            )}
        </S.Container>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(RecordCreator)
