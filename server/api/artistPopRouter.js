const router = require('express').Router()
var rp = require('request-promise')
// let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', async function(req, res) {
  console.log(`Access token is ${global.access_token}`)
  var options = {
    url: 'https://api.spotify.com/v1/me/following?type=artist',
    headers: {Authorization: 'Bearer ' + global.access_token},
    json: true
  }
  // use the access token to access the Spotify Web API
  const response = await rp(options)
  console.log(response.artists.items)
    res.send(response.artists.items)
})



