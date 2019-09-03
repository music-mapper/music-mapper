import axios from 'axios'

/**
 * ACTION TYPES
 */
const GETTING_GENRES = 'GETTING_GENRES'
const GET_GENRES = 'GET_GENRES'

/**
 * INITIAL STATE
 */
const initialState = {
  genres: [],
  loading: false
}

/**
 * ACTION CREATORS
 */
const gettingGenres = () => ({
  type: GETTING_GENRES
})
const getGenres = data => ({
  type: GET_GENRES,
  data
})

/**
 * THUNK CREATORS
 */

export const gotAllGenres = () => async dispatch => {
  try {
    dispatch(gettingGenres())
    const data = await axios.get('/api/album')
    dispatch(getGenres(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_GENRES:
      return {...state, loading: true}
    case GET_GENRES:
      return {...state, loading: false, genres: action.data}
    default:
      return state
  }
}
