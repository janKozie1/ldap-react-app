import { useState, useEffect } from 'react'

import { checkResponseStatus } from './functions'
import { fetchDefConfig } from '../constants/defaultVariables'

let { DEF_URL, DEF_PARAMS, DEF_QUERY } = fetchDefConfig;

export let useFetch = (query = DEF_QUERY, url = DEF_URL, params = DEF_PARAMS) => {
    let [response, setResponse] = useState(null)
    let [error, setError] = useState(null)
    let [isLoading, setIsLoading] = useState(null)
    useEffect(() => {
        let fetchData = (query, url, params) => {
            let timeout;
            setIsLoading(true)
            fetch(url, { ...params, body: JSON.stringify(query) })
                .then(checkResponseStatus)
                .then(res => res.json())
                .then(parsed => {
                    timeout=setTimeout(()=>{
                        setResponse(parsed);
                        setIsLoading(false)
                    },300)
                    
                })
                .catch((err)=>{
                    setError(err);
                    setIsLoading(false);
                })
            return clearTimeout(timeout);
        }
        if (url && query)
            return fetchData(query, url, params)
    }, [query])
    return [response, error, isLoading]
}