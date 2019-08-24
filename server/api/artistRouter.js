const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router
const rp = require('request-promise')

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', async function(req, res) {
  let trackInfo = []
  console.log(`Access token is ${global.access_token}`)
  var options = {
    url: 'https://api.spotify.com/v1/me/following?type=artist',
    headers: {
      Authorization: 'Bearer ' + global.access_token,
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  // use the access token to access the Spotify Web API
  try {
    const response = await rp(options)
      response.artists.items.map(artist =>{
        trackInfo.push({
          genre: artist.genres,
          artist: artist.name
        })
      })
    res.json(trackInfo)
  } catch (error) {
    console.log('It didn\'t work', error)
  }
})
