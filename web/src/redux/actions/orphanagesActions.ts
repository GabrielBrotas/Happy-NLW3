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