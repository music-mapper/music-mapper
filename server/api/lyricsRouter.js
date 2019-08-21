const router = require('express').Router()
let request = require('request')
require('../../secrets')
let querystring = require('querystring')
module.exports = router

  router.get('/', function (req, res) {
    var options = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Despacito%20 (Featuring%20Daddy%20Yankee)&q_artist=Luis%20Fonsi&apikey=${process.env.api_key}`,
    json: true
    }

    request.get(options, function(error, response, body) {
      console.log('error:', error) // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
      console.log('body:', body) // Print the HTML for the Google homepage.
    })

    res.redirect('localhost:8888')
  })



