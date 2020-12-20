import { CLEAR_ERROR, SET_ERROR, SET_UNAUTHENTICATED, SET_USER } from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    error: ''
}

interface ActionProps {
    type: string;
    payload: Object;
}

export default function userReducer(state = initialState, action: ActionProps) {

    switch(action.type) {
        case SET_USER:
            return {...state, authenticated: true, credentials: action.payload};
        case SET_UNAUTHENTICATED:
            return {...state, authenticated: false, credentials: {}};
        case SET_ERROR:
            return {...state, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: ''};
        default:
            return state
    }

}