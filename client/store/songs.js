import axios from 'axios'

/**
 * ACTION TYPES
 */
const GETTING_LYRICS = 'GETTING_LYRICS'
const GET_LYRICS = 'GET_LYRICS'

/**
 * INITIAL STATE
 */
const initialState= {
  lyrics: [],
  loading: false
}

/**
 * ACTION CREATORS
 */

const gettingLyrics = () => ({
  type: GETTING_LYRICS
})
const getLyrics = (data) => ({
  type: GET_LYRICS,
  data
})

/**
 * THUNK CREATORS
 */

export const gotAllLyrics = () => async dispatch => {
  try {
    dispatch(gettingLyrics())
    const data = await axios.get('/api/tracks')
    dispatch(getLyrics(data))
  } catch (err) {
    console.error('here it is:', err)
  }
}


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GETTING_LYRICS:
      return {...state, loading: true}
    case GET_LYRICS:
      return {...state, loading: false, lyrics: action.data}
    default:
      return state
  }
}
