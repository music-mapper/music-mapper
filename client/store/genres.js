import axios from 'axios'


/**
 * ACTION TYPES
 */

const GET_GENRES = 'GET_GENRES'

/**
 * INITIAL STATE
 */
const initialState= {
  genres: []
}

/**
 * ACTION CREATORS
 */

const getGenres = (data) => ({
  type: GET_GENRES,
  data
})

/**
 * THUNK CREATORS
 */

export const gotAllGenres = () => async dispatch => {
  try {
    const data = await axios.get('/api/album')
    dispatch(getGenres(data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GENRES:
      return {...state, genres: action.data}
    default:
      return state
  }
}
