import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
//ADDED BUT NOT CURRENTLY USED
import auth from './auth'
import songsReducer from './songs'

const reducer = combineReducers({user, auth, songsReducer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
//ADDED BUT NOT CURRENTLY USED
export * from './auth'
