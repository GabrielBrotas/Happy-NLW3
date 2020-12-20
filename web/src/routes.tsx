import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { stateProps } from './redux/store'
import { useSelector } from 'react-redux'
import AuthRoute from './utils/AuthRoute'
import NotAuthRoute from './utils/NotAuthRoute'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import OrphanagesRegistered from './pages/Dashboard/OrphanagesRegistered'
import OrphanagesPending from './pages/Dashboard/OrphanagesPending'
import OrphanageEditOrConfirm from './pages/Dashboard/OrphanageEditOrConfirm'
import OrphanageDelete from './pages/Dashboard/OrphanageDelete'

function Routes() {

    const {authenticated} = useSelector( (state: stateProps) => state.user)

    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
            
            <NotAuthRoute path="/login" component={Login} />
            <NotAuthRoute path="/forget-password" component={ForgetPassword} />
            <NotAuthRoute path="/reset-password/:id" component={ResetPassword} />
            
            <AuthRoute path="/dashboard/orphanages-registered" exact component={OrphanagesRegistered} />
            <AuthRoute path="/dashboard/orphanages-pending" exact component={OrphanagesPending} />
            <AuthRoute path="/dashboard/orphanages-registered/:action/:id" component={OrphanageEditOrConfirm} />
            <AuthRoute path="/dashboard/orphanages-pending/:action/:id" component={OrphanageEditOrConfirm} />
            <AuthRoute path="/dashboard/orphanages-registered/delete/:id" component={OrphanageDelete} />
        </Switch>
    </BrowserRouter>         
    )
}

export default Routes 
