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
   const firstReg = /[\\n]/g
   const secondReg = /[.,\/#!$%\^&\*;:{}=\-_~()"]/g
   //need to correct \n removal
   let newStr = rawData.replace(firstReg, '')
   newStr = newStr.replace(secondReg, ' ')
    //figure out whitespace to be able to slice from -7 at end
   newArray = newStr.split(' ').slice(0, -20)
   //make empty object
   //for loop over array (over its length)
   //check if it's in the object, if not add and initialize count to 1
   //if it is, increment count
   let wordCounter = {}

  res.json(newArray)
 })

}
catch (err) {
  next(err)
}
})
