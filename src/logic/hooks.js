import { useState, useEffect } from 'react'

import { checkResponseStatus, compareFetchedData } from './functions'
import { fetchDefConfig } from '../constants/defaultVariables'

let { DEF_URL, DEF_PARAMS, DEF_QUERY } = fetchDefConfig;

export let useFetch = (query = DEF_QUERY, url = DEF_URL, params = DEF_PARAMS, middleware) => {
    let [response, setResponse] = useState(null)
    let [error, setError] = useState(null)
    let [isLoading, setIsLoading] = useState(null)
    useEffect(() => {
        let fetchData = (query, url, params) => {
            setError(null);
            let timeout;
            setIsLoading(true)
            fetch(url, { ...params, body: JSON.stringify(query) })
                .then(checkResponseStatus)
                .then(res => res.json())
                .then(parsed => {
                    timeout = setTimeout(() => {
                        if (!compareFetchedData(response, parsed)){
                            setResponse(middleware(parsed));
                            setIsLoading(false)
                        }
                            
                        
                    }, 300)
                })
                .catch((err) => {
                    console.log(err.message)
                    if(err.message === 'Failed to fetch'){
                        setError({msg:'Coś poszło nie tak, spróbuj ponownie za chwilę'})
                    }
                    setIsLoading(false);
                })
            return clearTimeout(timeout);
        }
        if (url && query)
            return fetchData(query, url, params)
    }, [query])
    return [response, error, isLoading, setResponse]
}