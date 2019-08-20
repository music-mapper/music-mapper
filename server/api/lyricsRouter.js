const router = require('express').Router()
let request = require('request')
require('../../secrets')
let querystring = require('querystring')
module.exports = router

// this is assuming that "access_token" is available as a global variable!!
// global.access_token

// router.get('/', function(request, res) {
  // console.log(`Access token is ${global.access_token}`)
  // let data
  // var options = {
  //   url: 'https://api.spotify.com/v1/me/following?type=artist',
  //   headers: {Authorization: 'Bearer ' + global.access_token},
  //   json: true
  // }
  // // use the access token to access the Spotify Web API
  // request.get(options, function(error, response, body) {
  //   data = body
  //   console.log('ARTISTS GENRE: ', body.artists.items[0].genres)

  request(
    `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Thriller&q_artist=Michael%20Jackson&apikey=${
      process.env.api_key
    }`,
    function(error, response, body) {
      console.log('error:', error) // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
      console.log('body:', body) // Print the HTML for the Google homepage.
    }
  )

  // res.redirect('localhost:8888')
// })
