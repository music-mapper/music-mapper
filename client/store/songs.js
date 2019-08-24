import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LYRICS = 'GET_LYRICS'

/**
 * INITIAL STATE
 */
const songs= {
  lyrics: []
}

/**
 * ACTION CREATORS
 */

const getLyrics = (data) => ({
  type: GET_LYRICS,
  data
})

/**
 * THUNK CREATORS
 */

export const gotAllLyrics = () => async dispatch => {
  try {
    console.log('GETTING DATA')
    const data = await axios.get('/api/tracks')
    console.log('this is data in thunk', data)
    dispatch(getLyrics(data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = songs, action) {
  switch (action.type) {
    case GET_LYRICS:
      return {...state, lyrics: action.data}
    default:
      return state
  }
}
