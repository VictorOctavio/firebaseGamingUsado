import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import adminReducer, {ReadSellerAction} from './Admin'
import userReducer, {ReadUserAction} from './User'
import AppReducer from './appDuck'

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    app: AppReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    ReadUserAction()(store.dispatch)
    ReadSellerAction()(store.dispatch)
    return store
}