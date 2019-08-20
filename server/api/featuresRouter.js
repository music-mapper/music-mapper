const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', function(req, res) {
  console.log(`Access token is ${global.access_token}`)
  let data
  var options = {url: 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B', headers: {Authorization: 'Bearer ' + global.access_token}, json: true}
  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    data = body
    console.log('AUDIO FEATURES: ', body)
  })

  res.redirect('localhost:8888')
})
