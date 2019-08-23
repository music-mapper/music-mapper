import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
// const GETTING_TRACKS = 'GETTING_TRACKS'
// const GET_TRACKS = 'GET_TRACKS'
const GET_LYRICS = 'GET_LYRICS'

/**
 * INITIAL STATE
 */
const songs= {
  // defaultTracks:[],
  // loading: false
  lyrics: []
}

/**
 * ACTION CREATORS
 */
// const getTracks = (data) => ({
//   type: GET_TRACKS,
//   data

// })

const getLyrics = (data) => ({
  type: GET_LYRICS,
  data
})

/**
 * THUNK CREATORS
 */
// export const gotAllTracks = () => async dispatch => {
//   try {
//     const { data } = await axios.get('/api/tracks')
//     console.log('GOT ALL TRACKS ', data)
//     dispatch(getTracks(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

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
    // case GETTING_TRACKS:
    //   return {...state, loading: true}
    // case GET_TRACKS:
    //   return {...state, state: action.data}
    case GET_LYRICS:
      return {...state, lyrics: action.data}
    default:
      return state
  }
}
