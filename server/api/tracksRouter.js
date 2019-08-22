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


//   q_track= 'man in the mirror'
//   q_artist = 'michael jackson'

//   var options = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${q_track}&q_artist=${q_artist}&apikey=${process.env.api_key}`,
//   json: true}

//   // json: true
//  request.get(options, async function(error, response, body) {
//    console.log('error:', error) // Print the error if one occurred
//    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
//    console.log('body:', body.message.body.lyrics.lyrics_body) // Print the HTML for the Google homepage.

//   await res.json(body.message.body.lyrics.lyrics_body)
//  })

}
catch (err) {
  next(err)
}
})
