import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'

function Routes() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />
            
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
            <Route path="/login" component={Login} />
            <Route path="/forget-password" component={ForgetPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </BrowserRouter>         
    )
}

export default Routes 
