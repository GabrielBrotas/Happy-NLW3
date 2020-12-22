import { GET_ORPHANAGE, GET_ORPHANAGES } from "../types"


const initialState = {
    orphanages: [],
    orphanage: {}
}

interface actionProps {
    type: string
    payload: any
}

export interface OrphanageProps {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{
        id: number;
        url: string;
    }>
    accepted: boolean;
}

export default function orphanagesReducer(state = initialState, action: actionProps) {

    switch (action.type) {
        case GET_ORPHANAGES:
            return {...state, orphanages: action.payload}
            
        case GET_ORPHANAGE:
            return {...state, orphanage: action.payload}
            
        default: 
        return state
    }
}