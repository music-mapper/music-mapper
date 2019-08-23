const router = require('express').Router()
let request = require('request')
var rp = require('request-promise')
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


// let id = '3lFGBrRWUxpTfhhq6lGBRw'
router.get('/', async function(req, res, next) {
  var options = {url: 'https://api.spotify.com/v1/me/tracks', headers: { Authorization: 'Bearer ' + global.access_token}, json: true }

  try {
    let trackInfo = []
    const response = await rp(options)

    response.items.map(song => trackInfo.push({id: song.track.id}))

  // console.log("TRACK INFO ", trackInfo)

  let audioFeatures = []

  //CANNOT USE MAP IN A CALLBACK FUNCTION, MUST USE A SIMPLE FOR LOOP
  for (let i = 0; i < trackInfo.length; i++) {
    let id = trackInfo[i].id;

  var newOptions={url: `https://api.spotify.com/v1/audio-features?ids=${id}`, headers: {Authorization: 'Bearer ' + global.access_token}, json: true}

  //MUST ONLY HAVE ONE ASYNC FOR MULTIPLE AWAIT
  let response2 = await rp(newOptions)

  // console.log('AUDIO FEATURES: ', response2.audio_features)
  audioFeatures.push(response2)
  }
  let numOfTracks = audioFeatures.length;
  let combinedFeautures = {danceability: 0, energy: 0, speechiness: 0, acousticness:0, instrumentalness: 0, liveness: 0, valence: 0 }
  for (let i = 0; i < audioFeatures.length; i ++) {
    // console.log(audioFeatures[i].audio_features[0])
    spotifyObj = audioFeatures[i].audio_features[0]
    for (let key in spotifyObj){
      if (key === 'danceability') {
        combinedFeautures.danceability+= spotifyObj[key]
    }
    if (key === 'energy') {
      combinedFeautures.energy+= spotifyObj[key]
  }
  if (key === 'speechiness') {
    combinedFeautures.speechiness+= spotifyObj[key]
}
if (key === 'acousticness') {
  combinedFeautures.acousticness+= spotifyObj[key]
}
if (key === 'instrumentalness') {
  combinedFeautures.instrumentalness+= spotifyObj[key]
}
if (key === 'liveness') {
  combinedFeautures.liveness+= spotifyObj[key]
}
if (key === 'valence') {
  combinedFeautures.valence+= spotifyObj[key]
}
  }

}
res.send(combinedFeautures)

  }
catch(error){
  next(error)
}
})
