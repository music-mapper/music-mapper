const router = require('express').Router()
const rp = require('request-promise')
module.exports = router


router.get('/', async function(req, res) {
  let trackInfo = []
  let returnArr = []
  let counter = {}
  console.log(`Access token is ${req.session.access_token}`)
  let options = {
    url: 'https://api.spotify.com/v1/me/albums',
    headers: {
      Authorization: 'Bearer ' + req.session.access_token,
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  try {
    const response = await rp(options)
    response.items.map(song =>{
      trackInfo.push({
        id: song.album.artists[0].id,
        releaseDate: song.album.release_date,
        artist: song.album.artists[0].name
      })
    })
    for (let i = 0; i < trackInfo.length; i++){
      let id = trackInfo[i].id
      let newOptions = {
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
          Authorization: 'Bearer ' + req.session.access_token,
          'User-Agent': 'Request-Promise'
        },
        json: true
      }
      let response2 = await rp(newOptions)
      const genre = response2.genres
      returnArr.push(...genre)
    }
    returnArr.forEach(word => {
      counter[word] = counter[word] ? counter[word] + 2 : 2
    })
    let data = []
    for (key in counter){
      data.push({
        text: key,
        value: counter[key]
      })
    }
    res.json(data)
  } catch (error) {
    console.log('error in the albumRouter', error)
  }
})
