import React, { useContext, createContext, useReducer } from 'react'

const Store = createContext({})

const StoreProvider = ({ defaultState, reducer, children }) => {
    return (
        <Store.Provider value={useReducer(reducer, defaultState)}>
            {children}
        </Store.Provider>
    )
}
export let useStateValue = () => useContext(Store)
export default StoreProvider
