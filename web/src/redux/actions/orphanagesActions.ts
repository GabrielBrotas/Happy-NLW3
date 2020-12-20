import api from "../../services/api"
import { GET_ORPHANAGE, GET_ORPHANAGES } from "../types";

export const getOrphanages = (acceptedOrphanages: boolean) => (dispatch: Function) => {

    api.get(`/orphanages/${acceptedOrphanages}`).then( (res) => {
        dispatch({type: GET_ORPHANAGES, payload: res.data});        
    })

}

export const getOrphanage = (id: string) => (dispatch: Function) => {

    api.get(`/orphanage/${id}`).then( (res) => {
        dispatch({type: GET_ORPHANAGE, payload: res.data});        
    })

}

export const createOrphanage = (orphanageData: FormData, push: Function) => (dispatch: Function) => {

    api.post('/orphanages', orphanageData)
        .then( () => {
            alert("orphanage created successfully");
            push('/app')
            dispatch(getOrphanages(true))
        })
        .catch( () => {
            alert("something went wrong");
        })
}

export const orphanagePendingResponse = (id: string, adminResponse: boolean, push: Function) => (dispatch: Function) => {

    api.post(`/orphanages/accept-response/${id}`, {adminResponse})
        .then( () => {
            dispatch(getOrphanages(true))
            push('/dashboard/orphanages-registered')
        })
}