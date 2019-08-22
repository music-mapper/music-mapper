const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', function(req, res, next) {
  try {
  // console.log(`Access token is ${global.access_token}`)
  // let data
  // var options = {
  //   url: 'https://api.spotify.com/v1/me/tracks',
  //   headers: {Authorization: 'Bearer ' + global.access_token},
  //   json: true
  // }
  // // use the access token to access the Spotify Web API
  // request.get(options, function(error, response, body) {

  //   const  trackInfo = []
  //   body.items.map(song =>
  //   trackInfo.push({artist: song.track.artists[0].name,
  //   id: song.track.id,
  //   name: song.track.name})
  //   )

  //   // res.send(trackInfo)
  // })


  q_track= 'man in the mirror'
  q_artist = 'michael jackson'

  var options = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${q_track}&q_artist=${q_artist}&apikey=${process.env.api_key}`,
  json: true}

  // json: true
 request.get(options, async function(error, response, body) {
   const rawData = await body.message.body.lyrics.lyrics_body.toUpperCase()
   const secondReg = /[.,\/#!?$%\^&\*;:{}=\-_~()"\d\n]/g
   let newStr = rawData.replace(secondReg, ' ')
    //slice from -7 at end to remove needless warning
   newArray = newStr.split(' ').filter(el => el !== '').slice(0, -7)
   // count the words--could do more than one here
   let wordCounter = {}
   newArray.forEach(word => {
     wordCounter[word] = (wordCounter[word]) ? wordCounter[word] + 1 : 1
   })
   let outputData = []
   for (key in wordCounter) {
    outputData.push({
      Name: key,
      Count: wordCounter[key]
    })
   }
  res.json(outputData)
 })
}
catch (err) {
  next(err)
}
})
