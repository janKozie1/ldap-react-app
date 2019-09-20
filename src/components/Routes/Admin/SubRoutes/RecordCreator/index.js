import React, { useState } from 'react'

import withProtectedRoute from 'components/HOC/ProtectedRoute'
import { useStateValue } from 'logic/store'

import Select from 'components/Shared/Select'
import UserCreator from './GroupCreator'

import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_URL, DEF_PARAMS, BASE_URL } = fetchDefConfig
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
        _id: 'group'
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
            id: 'path'
        },
        {
            text: 'Lokalizacja',
            id: 'location'
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
        console.log(data)
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
    return (
        <S.Container>
            <S.Type>
                <p>Nowy: </p>
                <Select
                    options={OPTIONS}
                    current={current}
                    selectFunction={setCurrent}
                    width={'150px'}
                />
            </S.Type>
            <UserCreator
                loading={loading}
                response={response}
                onSubmit={onSubmit}
                fields={fields[current._id]}
            />
        </S.Container>
    )
}

export default withProtectedRoute({
    protectedRoute: true,
    redirectTo: '/login'
})(RecordCreator)

// const Form = ({ handleRequest, isLoading }) => {
//     let [current, setCurrent] = useState(OPTIONS[0])
//     let [userInput, setUserInput] = useState('')
//     let onFormSubmit = e => {
//         e.preventDefault()
//         handleRequest({ type: current._id, query: userInput })
//     }
//     let handleSelect = obj => {
//         setCurrent(obj)
//     }
//     return (
//         <S.Form onSubmit={onFormSubmit}>
//             <Select
//                 current={current}
//                 options={OPTIONS}
//                 selectFunction={handleSelect}
//             />
