import { useState, useEffect } from 'react'

import { checkResponseStatus } from './functions'
import { fetchDefConfig } from '../constants/defaultVariables'

let { DEF_URL, DEF_PARAMS, DEF_QUERY } = fetchDefConfig;

export let useFetch = (query = DEF_QUERY, url = DEF_URL, params = DEF_PARAMS) => {
    let [response, setResponse] = useState(null)
    let [error, setError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        let fetchData = (query, url, params) => {
            setIsLoading(true)
            fetch(url, { ...params, body: JSON.stringify(query) })
                .then(checkResponseStatus)
                .then(res => res.json())
                .then(parsed => {
                    setResponse(parsed);
                    setIsLoading(false)
                })
                .catch(setError)
        }
        if (url && query)
            fetchData(query, url, params)
    }, [query])
    return [response, error, isLoading]
}