const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

// router.get('/', function(req, res) {
//   console.log(`Access token is ${global.access_token}`)
//   let data
//   var options = {url: 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B', headers: {Authorization: 'Bearer ' + global.access_token}, json: true}
//   // use the access token to access the Spotify Web API
//   request.get(options, function(error, response, body) {
//     data = body
//     console.log('AUDIO FEATURES: ', body)
//   })

//   res.redirect('localhost:8888')
// })

// let id = "3lFGBrRWUxpTfhhq6lGBRw"
router.get('/', function(req, res, next) {
  try{
  //  console.log(`Access token is ${global.access_token}`)
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
    trackInfo.push({
    id: song.track.id,
    name: song.track.name})
    )
      res.send(trackInfo)

  })

var newOptions={url: `https://api.spotify.com/v1/audio-features?ids=${id}`, headers: {Authorization: 'Bearer ' + global.access_token}, json: true}


  // use the access token to access the Spotify Web API
  request.get(newOptions, function(error, response, body) {
    data = body
    console.log('AUDIO FEATURES: ', body.audio_features)
  })
  res.redirect('localhost:8888')
}
catch(error){
  next(error)
}
})

// danceability: 0.862,
//       energy: 0.351,
//       key: 9,
//       loudness: -11.793,
//       mode: 1,
//       speechiness: 0.0439,
//       acousticness: 0.292,
//       instrumentalness: 0,
//       liveness: 0.105,
//       valence: 0.521,
//       tempo: 124.964,
