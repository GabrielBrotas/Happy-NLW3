import api from "../../services/api"
import { GET_ORPHANAGES } from "../types";

export const getOrphanages = () => (dispatch: Function) => {

    api.get('/orphanages/true').then( (res) => {
        dispatch({type: GET_ORPHANAGES, payload: res.data});        
    })

}