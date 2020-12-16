import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRouter from './components/ProtectedRouter'
import AdminRouter from './components/AdminRouter'

//pages
import Home from './components/pages/Announcement'
import Booking from './components/pages/Booking'
import NotFound from './components/pages/NotFound'
import StudentsLogin from './components/pages/StudentsLogin'
import AccessDenied from './components/pages/AccessDenied'
import Dashboard from './components/pages/Dashboard'



function App() {

    
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <ProtectedRouter   path="/booking" exact component={Booking} />
                <Route path="/login" exact component={StudentsLogin} />
                <AdminRouter  path="/dashboard" component={Dashboard}  />
                <Route path="/acessdenied" exact component={AccessDenied} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default App
