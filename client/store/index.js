import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
//ADDED BUT NOT CURRENTLY USED
import auth from './auth'
import songs from './songs'
import audioFeatures from './features'

const reducer = combineReducers({user, auth, songs, audioFeatures})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songs'
export * from './features'

//ADDED BUT NOT CURRENTLY USED
export * from './auth'
