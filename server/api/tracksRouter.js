const router = require('express').Router()
let request = require('request')
// let querystring = require('querystring')
module.exports = router
var rp = require('request-promise')


// this is assuming that "access_token" is available as a global variable!!
// global.access_token

router.get('/', async function(req, res, next) {
  var trackInfo = []
  let concatArr = []
  let wordCounter = {}

  console.log(`Access token is ${global.access_token}`)
  var options = {
    url: 'https://api.spotify.com/v1/me/tracks',
    headers: {
      Authorization: 'Bearer ' + global.access_token,
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  // use the access token to access the Spotify Web API
  try {
  const response = await rp(options)
  console.log('trackInfo', response.items)
      response.items.map(song =>
        trackInfo.push({
          artist: song.track.artists[0].name,
          id: song.track.id,
          name: song.track.name
        })
      )
        for (let i = 0; i < trackInfo.length; i++){
          const q_artist =  trackInfo[i].artist
          const q_track = trackInfo[i].name
          var lyricsOptions = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${q_track}&q_artist=${q_artist}&apikey=${process.env.api_key}`,
          json: true}
          const lyrics = await rp(lyricsOptions)
          const rawData = lyrics.message.body.lyrics.lyrics_body.toUpperCase()
          const secondReg = /[.,\/#!?$%\^&\*;:{}=\-_~()"\d\n]/g
          let newStr = rawData.replace(secondReg, ' ')
          //slice from -7 at end to remove needless warning
          let newArray = newStr.split(' ').filter(el => el !== '').slice(0, -7)
          concatArr.push(...newArray)

        }
        concatArr.forEach(word => {
          wordCounter[word] = wordCounter[word] ? wordCounter[word] + 1 : 1
        })
        let outputData = []
        let badWords = ['THE', 'AND', 'THIS', 'A', 'THAT', 'OF', 'BUT', 'IS', 'FOR', 'TO', 'WAS', 'IT', 'I', 'ON', `IT'S`]
          for (let key in wordCounter) {
          if (!badWords.includes(key))
           outputData.push({
             Name: key,
             Count: wordCounter[key]
           })
          }
         res.json(outputData)

  }
    catch(error) {
      console.log('failed', error)
    }

})
