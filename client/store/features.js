import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GETTING_FEATURES = 'GETTING_FEATURES'
const GET_FEATURES = 'GET_FEATURES'

/**
 * INITIAL STATE
 */
const initialState = {
  features: [],
  loading: false
}

/**
 * ACTION CREATORS
 */
const gettingFeatures = () => ({
  type: GETTING_FEATURES
})

const getFeatures = data => ({
  type: GET_FEATURES,
  data
})

/**
 * THUNK
 */

export const gotAllFeatures = () => async dispatch => {
  try {
    dispatch(gettingFeatures())
    const data = await axios.get('/api/features')
    dispatch(getFeatures(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_FEATURES:
      return {...state, loading: true}
    case GET_FEATURES:
      return {...state, loading: false, features: action.data}
    default:
      return state
  }
}
