import React, { useState } from 'react'

import Spinner from 'components/Shared/Spinner'

import * as S from './styledComponents'

const UserCreator = ({ onSubmit, isLoading, response }) => {
    console.log(isLoading)
    let [userID, setUserID] = useState('')
    let [userName, setUserName] = useState({ firstName: '', surname: '' })
    let [userOffice, setUserOffice] = useState('')

    let updateUserName = (type, value) => {
        setUserName({
            ...userName,
            [type]: value.charAt(0).toUpperCase() + value.slice(1)
        })
    }
    let onFormSubmit = e => {
        e.preventDefault()
        onSubmit({ userID, userName, userOffice })
    }
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Dodaj</S.Header>
            <S.Label>
                <S.LabelTitle>ID</S.LabelTitle>
                <S.Input
                    type='text'
                    value={userID}
                    maxLength={15}
                    onChange={({ target: { value } }) =>
                        setUserID(value.toUpperCase())
                    }
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Imię</S.LabelTitle>
                <S.Input
                    type='text'
                    value={userName.firstName}
                    onChange={({ target: { value } }) =>
                        updateUserName('firstName', value)
                    }
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Naziwsko</S.LabelTitle>
                <S.Input
                    type='text'
                    value={userName.surname}
                    onChange={({ target: { value } }) =>
                        updateUserName('surname', value)
                    }
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Biuro</S.LabelTitle>
                <S.Input
                    maxLength={40}
                    type='text'
                    value={userOffice}
                    onChange={({ target: { value } }) => setUserOffice(value)}
                />
            </S.Label>
            <S.Footer>
                <S.Message ok={response.ok}>{response.msg}</S.Message>
                <S.Submit>
                    {isLoading ? (
                        <Spinner size={20} color={'white'} />
                    ) : (
                        'Zapisz'
                    )}
                </S.Submit>
            </S.Footer>
        </S.Form>
    )
}

export default UserCreator
