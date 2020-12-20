import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import orphanagesReducer, { OrphanageProps } from './reducers/orphanagesReducers'

const middleware = [thunk]

const initialState = {}

export interface stateProps {
    user: {
        credentials: {
            id: string,
            email: string,
            name: string,   
        },
        authenticated: boolean,
        error: string
    },
    orphanages: {
        orphanage: OrphanageProps,
        orphanages: Array<OrphanageProps> 
    }
}

const reducers = combineReducers({
    user: usersReducer,
    orphanages: orphanagesReducer,
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store