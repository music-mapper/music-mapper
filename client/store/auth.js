import axios from 'axios'
import history from '../history'
//CURRENTLY NOT USED, DO WE WANT TO USE A STORE? JUST SOME ROUGH IDEAS
/**
 * ACTION TYPES
 */
const LOGIN_USER = 'LOGIN_USER'

/**
 * INITIAL STATE
 */
const accessToken = {}

/**
 * ACTION CREATORS
 */
const loginUser = () => ({type: LOGIN_USER, token})
/**
 * THUNK CREATORS
 */
export const login = () => async dispatch => {
  try {
    const res = await axios.get('/spotify/login')
    dispatch(loginUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = accessToken, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.token
    default:
      return state
  }
}
