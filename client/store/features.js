import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */

const GET_FEATURES = 'GET_FEATURES'

/**
 * INITIAL STATE
 */
const initialState = {
  features: []
}

/**
 * ACTION CREATORS
 */


const getFeatures = (data) => ({
  type: GET_FEATURES,
  data
})


/**
 * THUNK
 */

export const gotAllFeatures = () => async dispatch => {
  try {
    const data = await axios.get('/api/features')
    dispatch(getFeatures(data))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEATURES:
      return {...state, features: action.data}
    default:
      return state
  }
}
