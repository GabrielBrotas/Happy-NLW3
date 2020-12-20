import api from '../../services/api'
import { SET_USER } from '../types'

interface userDataProps {
    email: string;
    password: string;
}

export const loginUser = (userData: userDataProps, push: Function) => (dispatch: Function) => {

    api.post('/login', userData)
    .then( res => {
        authorizationHeader(res.data.token)
        dispatch({type: SET_USER, payload: res.data.user})
        push('/dashboard/orphanages-registered')
    })
    .catch( err => {
        console.log(err)
    })

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