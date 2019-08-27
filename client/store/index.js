import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import songs from './songs'
import audioFeatures from './features'
import genres from './genres'
import artists from './artists'


const reducer = combineReducers({songs, audioFeatures, genres, artists})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export * from './songs'
export * from './features'
export * from './artists'
export * from  './genres'
