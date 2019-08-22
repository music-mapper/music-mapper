import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GETTING_TRACKS = 'GETTING_TRACKS'
const GET_TRACKS = 'GET_TRACKS'

/**
 * INITIAL STATE
 */
const initialState={
  defaultTracks:[],
  loading: false
}

/**
 * ACTION CREATORS
 */
const getTracks = (data) => ({
  type: GET_TRACKS,
  data

})

/**
 * THUNK CREATORS
 */
export const gotAllTracks = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/tracks')
    console.log('GOT ALL TRACKS ', data)
    dispatch(getTracks(data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function songsReducer(state = {initialState}, action) {
  switch (action.type) {
    case GETTING_TRACKS:
      return {...state, loading: true}
    case GET_TRACKS:
      return {...state, state: action.data}
    default:
      return state
  }
}
