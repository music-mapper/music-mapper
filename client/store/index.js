import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
//ADDED BUT NOT CURRENTLY USED
import auth from './auth'
import songs from './songs'
import audioFeatures from './features'

const reducer = combineReducers({auth, songs, audioFeatures})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export * from './songs'
export * from './features'

//ADDED BUT NOT CURRENTLY USED
export * from './auth'
