const router = require('express').Router()
var rp = require('request-promise')
module.exports = router


router.get('/', async function(req, res) {
  console.log(`Access token is ${global.access_token}`)
  var options = {
    url: 'https://api.spotify.com/v1/me/tracks',
    headers: {Authorization: 'Bearer ' + global.access_token},
    json: true
  }
  // use the access token to access the Spotify Web API


  const artists = {}

  const response = await rp(options)

  for (let i = 0; i < response.items.length; i ++) {
    const artistName = response.items[i].track.album.artists[0].name
    if (artists[artistName]) {
      artists[artistName] += 1;
    } else {
      artists[artistName] = 1;
    }
  }

  var options2 = {
    url: 'https://api.spotify.com/v1/me/albums',
    headers: {Authorization: 'Bearer ' + global.access_token},
    json: true
  }

  const response2 = await rp(options2)

  for (let i = 0; i < response2.items.length; i++) {
    let numOfTracks = response2.items[i].album.tracks.items.length;
    let artistName = response2.items[i].album.artists[0].name;
    if (artists[artistName]){
      artists[artistName] += numOfTracks;
    } else {
      artists[artistName] = numOfTracks;
    }
  }

  const readyForTreeTable = []

  for (let key in artists) {
    readyForTreeTable.push({name: key, value: artists[key] })
  }

  res.send(readyForTreeTable)
})


