import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRACKS = 'GET_TRACKS'

/**
 * INITIAL STATE
 */
const defaultTracks = []

/**
 * ACTION CREATORS
 */
const getTracks = () => ({type: GET_TRACKS})

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
export default function(state = defaultTracks, action) {
  switch (action.type) {
    case GET_TRACKS:
      return [...state,  action]
    default:
      return state
  }
}
