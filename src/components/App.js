import React from 'react'

import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Routes/Home'

import GlobalTheme from './GlobalTheme'

const App = () => {
    return (
        <GlobalTheme>
            <Router>
                <Route path='/' exact component={Home} />
            </Router>
        </GlobalTheme>
    )
}
export default App
