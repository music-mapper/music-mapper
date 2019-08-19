/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express') // Express web server framework
require('../secrets')
var request = require('request') // "Request" library
var cors = require('cors')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')
var client_id = 'e14255b2d5d04b8ab2925cfe67cff691' // Your client id
var client_secret = process.env.client_secret // Your secret
var redirect_uri = 'http://localhost:8888/callback' // Your redirect uri
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
var stateKey = 'spotify_auth_state'
var app = express()
app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
app.get('/login', function(req, res) {
  var state = generateRandomString(16)
  res.cookie(stateKey, state)
  // your application requests authorization
  var scope = 'user-library-read user-follow-read playlist-read-private'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  )
})
app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null
  var state = req.query.state || null
  var storedState = req.cookies ? req.cookies[stateKey] : null
  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(stateKey)
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token
        var options = {
          url: 'https://api.spotify.com/v1/me/albums',
          headers: {Authorization: 'Bearer ' + access_token},
          json: true
        }
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log('ALBUM NAME: ', body.items[0].album.name)
        })
        options.url = 'https://api.spotify.com/v1/me/tracks'
        request.get(options, function(error, response, body) {
          console.log('TRACK ID: ', body.items)
          // console.log('TRACKS (ONE): ', body.items[0].track.name);
        })

        options.url =
          'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBRT_KVuxlznTa0KQErxyDKeFP1dm9HtO9J6DPOX_SQCgfQvlptWWY5EHJPZwx6YTS703rtH1QBN_RW7W-kJZMUvio-cOgY_qO7b9Fr6poKaNgtR7jIBAL4zVWdSYbNTFMCBq0xABdlNJdLWYvCxAk'
        request.get(options, function(error, response, body) {
          console.log('AUDIO FEATURES: ', body)
        })

        options.url = 'https://api.spotify.com/v1/me/following?type=artist'
        request.get(options, function(error, response, body) {
          console.log('ARTISTS (GENRE): ', body.artists.items[0].genres)
        })
        options.url = 'https://api.spotify.com/v1/me/playlists'
        request.get(options, function(error, response, body) {
          console.log('PLAYLISTS: ', body)
        })

        //we can also pass the token to the browser to make requests from there
        res.redirect(
          '/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        )
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        )
      }
    })
  }
})
app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      res.send({
        access_token: access_token
      })
    }
  })
})

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

console.log('Listening on 8888')
app.listen(8888)
