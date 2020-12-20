import React from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { stateProps } from '../redux/store'

interface IProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}

const AuthRoute = ({component: Component, ...rest}: IProps) => {
  
    const {authenticated} = useSelector((state: stateProps) => state.user)

    return (
    <Route 
        {...rest}
        render={(props) => 
            authenticated === true 
            ? <Component {...props} />
            : <Redirect to="/login" />
        }
    />
)}

export default AuthRoute