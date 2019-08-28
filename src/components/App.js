import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Routes/Home'
import Login from './Routes/Login'
import withGlobalTheme from './GlobalTheme'

const App = () => {
    return (
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
        </Router>
    )
}
export default withGlobalTheme(App)
