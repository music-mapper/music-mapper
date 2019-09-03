import axios from 'axios'

/**
 * ACTION TYPES
 */
const GETTING_ARTIST_FREQ = 'GETTING_ARTIST_FREQ'
const GET_ARTISTS_FREQ = 'GET_ARTISTS_FREQ'

/**
 * INITIAL STATE
 */
const initialState = {
  frequency: [],
  popularity: [],
  loading: false
}

/**
 * ACTION CREATORS
 */
const gettingArtistFreq = () => ({
  type: GETTING_ARTIST_FREQ
})
const getArtistsFreq = data => ({
  type: GET_ARTISTS_FREQ,
  data
})

/**
 * THUNK CREATORS
 */

export const gotArtistsFreq = () => async dispatch => {
  try {
    dispatch(gettingArtistFreq())
    const {data} = await axios.get('/api/artistsFreq')
    dispatch(getArtistsFreq(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_ARTIST_FREQ:
      return {...state, loading: true}
    case GET_ARTISTS_FREQ:
      return {...state, loading: false, frequency: action.data}
    default:
      return state
  }
}
