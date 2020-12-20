import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'

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
    }
}

const reducers = combineReducers({
    user: userReducer
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store