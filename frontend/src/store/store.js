import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { activityReducer } from './reducers/activityReducer';
import { userReducer } from './reducers/userReducer';
import {systemReducer} from './reducers/systemReducer';
import {filterReducer} from './reducers/filterReducer';

const rootReducer = combineReducers({
    activityReducer,
    filterReducer,
    userReducer,
    systemReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))