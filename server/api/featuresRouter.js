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


  audioFeatures.push(response2)
  }
  let numOfTracks = audioFeatures.length;
  let combinedFeautures = {Danceability: 0, Energy: 0, Speechiness: 0, Liveness: 0, Valence: 0, Acousticness: 0 }
  for (let i = 0; i < audioFeatures.length; i ++) {
    spotifyObj = audioFeatures[i].audio_features[0]
    for (let key in spotifyObj){
      if (key === 'danceability') {
        combinedFeautures.Danceability+= spotifyObj[key]
    }
    if (key === 'energy') {
      combinedFeautures.Energy+= spotifyObj[key]
  }
  if (key === 'speechiness') {
    combinedFeautures.Speechiness+= spotifyObj[key]
}
if (key === 'liveness') {
  combinedFeautures.Liveness+= spotifyObj[key]
}
if (key === 'valence') {
  combinedFeautures.Valence+= spotifyObj[key]
}
if (key === 'acousticness') {
  combinedFeautures.Acousticness+= spotifyObj[key]
}
  }

  finalCombinedFeatures = []
 for (let key in combinedFeautures) {
   finalCombinedFeatures.push({Name: key, Count:
     Math.round(Number((combinedFeautures[key]/numOfTracks) *100))
    })
 }

}
res.send(finalCombinedFeatures)

  }
catch(error){
  next(error)
}
})
