import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ARTISTS_FREQ = 'GET_ARTISTS_FREQ'

/**
 * INITIAL STATE
 */
const artists = {
  frequency: [],
  popularity: []
}

/**
 * ACTION CREATORS
 */

const getArtistsFreq = (data) => ({
  type: GET_ARTISTS_FREQ,
  data
})

/**
 * THUNK CREATORS
 */

export const gotArtistsFreq = () => async dispatch => {
  try {
    console.log('GETTING DATA')
    const { data } = await axios.get('/api/artistsFreq')
    console.log('this is data in thunk', data)
    dispatch(getArtistsFreq(data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = artists, action) {
  switch (action.type) {
    case GET_ARTISTS_FREQ:
      return {...state, frequency: action.data}
    default:
      return state
  }
}
