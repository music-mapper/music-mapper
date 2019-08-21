const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', function(req, res, next) {
  try {
  console.log(`Access token is ${global.access_token}`)
  let data
  var options = {
    url: 'https://api.spotify.com/v1/me/tracks',
    headers: {Authorization: 'Bearer ' + global.access_token},
    json: true
  }
  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    const  trackInfo = []
    body.items.map(song =>
    trackInfo.push({artist: song.track.artists[0].name,
    id: song.track.id,
    name: song.track.name})
    )
    res.send(trackInfo)
  })

}
catch (err) {
  next(err)
}
})
