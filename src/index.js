import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import StoreProvider from './logic/store'

import RootReducer from './logic/reducers/index'

ReactDOM.render(
    <StoreProvider reducer={RootReducer} defaultState={{ token: 'xd' }}>
        <App />
    </StoreProvider>,
    document.getElementById('root')
)
