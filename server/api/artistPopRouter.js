const router = require('express').Router()
const rp = require('request-promise')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', async function(req, res) {
  console.log(`Access token is ${req.session.access_token}`)
  let options = {
    url: 'https://api.spotify.com/v1/me/following?type=artist',
    headers: {Authorization: 'Bearer ' + req.session.access_token},
    json: true
  }
  // use the access token to access the Spotify Web API
  const response = await rp(options)
    res.send(response.artists.items)
})



