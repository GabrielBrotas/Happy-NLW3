import api from '../../services/api'
import { SET_ERROR, SET_UNAUTHENTICATED, SET_USER, CLEAR_ERROR } from '../types'

interface userDataProps {
    email: string;
    password: string;
}

export const loginUser = (userData: userDataProps, push: Function) => (dispatch: Function) => {

    api.post('/login', userData)
    .then( res => {
        authorizationHeader(res.data.token)
        dispatch({type: SET_USER, payload: res.data.user})
        dispatch({type: CLEAR_ERROR})
        push('/dashboard/orphanages-registered')
    })
    .catch( err => {
        dispatch({type: SET_ERROR, payload: err.response.data})
    })

}

export const logoutUser = () => (dispatch: Function) => {
    localStorage.removeItem("IdToken");
    delete api.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});
}

export const getUserData = (userId: number) => (dispatch: Function) => {

    api.get(`/user/${userId}`)
        .then( res => {
            dispatch({type: SET_USER, payload: res.data})
        })
        .catch( err => {
            console.log(err)
        })
}

const authorizationHeader = (token: string) => {
    const IdToken = `Bearer ${token}`
    localStorage.setItem('IdToken', IdToken)
    api.defaults.headers.common["Authorization"] = IdToken
}