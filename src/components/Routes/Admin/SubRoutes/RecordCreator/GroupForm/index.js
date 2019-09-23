import React, { useState, useEffect } from 'react'

import Autocomplete from 'components/Shared/Autocomplete'
import Spinner from 'components/Shared/Spinner'
import { fetchDefConfig } from 'constants/defaultVariables'

import * as S from './styledComponents'

const { DEF_PARAMS, BASE_URL } = fetchDefConfig

const GroupForm = (onFormSubmit, response, isLoading) => {
    let [paths, setPaths] = useState([])
    let [group, setGroup] = useState('')
    console.log('?')
    useEffect(() => {
        let getPaths = async () => {
            let res = await fetch(`${BASE_URL}/users/allFolders`, DEF_PARAMS)
            let body = await res.json()
            setPaths(body)
        }
        getPaths()
    }, [])
    return (
        <S.Form onSubmit={onFormSubmit}>
            <S.Header>Dodaj</S.Header>
            <S.Label>
                <S.LabelTitle>Grupa</S.LabelTitle>
                <S.Input
                    value={group}
                    onChange={({ target: { value } }) => setGroup(value)}
                />
            </S.Label>
            <S.Label>
                <S.LabelTitle>Ścieżka</S.LabelTitle>
                <S.Container>
                    <Autocomplete
                        options={paths}
                        matchBy={'folderPath'}
                        maxRows={6}
                        uniqueKey={'folder_ID'}
                        display={'folderPath'}
                        exclude={[]}
                        width={'320px'}
                        regex={`.*xxx.*`}
                    />
                </S.Container>
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

export default GroupForm
