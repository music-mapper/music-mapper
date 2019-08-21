const router = require('express').Router()
let request = require('request')
require('../../secrets')
let querystring = require('querystring')
module.exports = router

  // request(
  //   // `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Thriller&q_artist=Michael%20Jackson&apikey=${
  //   //   process.env.api_key
  //   // }`,
  //   `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Despacito%20 (Featuring%20Daddy%20Yankee)&q_artist=Luis%20Fonsi&apikey=${
  //     process.env.api_key
  //   }`
  // )

  //artist name - Luis Fonsi
  //track name -  Despacito (Featuring Daddy Yankee)



  router.get('/', function (req, res) {
    let q_artist = res.artist
    // let q_artist = "Luis Fonsi"

    let q_track = res.name
    // let q_track = "Despacito (Featuring Daddy Yankee)"

    // var options = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Despacito%20(Featuring%20Daddy%20Yankee)&q_artist=Luis%20Fonsi&apikey=${process.env.api_key}`,
    // json: true
    // }

  //artist name - Luis Fonsi
  // Luis%20Fonsi

  //track name -  Despacito (Featuring Daddy Yankee)
  // Despacito%20(Featuring%20Daddy%20Yankee)


     var options = {url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${q_track}&q_artist=${q_artist}&apikey=${process.env.api_key}`,
     json: true}


    request.get(options, function(error, response, body) {
      console.log('error:', error) // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
      console.log('body:', body) // Print the HTML for the Google homepage.
    })

    res.redirect('localhost:8888')
  })



