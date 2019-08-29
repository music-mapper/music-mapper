const router = require('express').Router()
let request = require('request')
let querystring = require('querystring')
module.exports = router
const session = require('express-session')

let redirect_uri =
  process.env.REDIRECT_URI || 'https://spotify-music-mapper.herokuapp.com'


router.get('/login', function(req, res) {
  console.log('Logging in...')
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-library-read user-follow-read playlist-read-private',
      show_dialog: true,
      redirect_uri
    }))
})

router.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {

    // we want to send this access token back to store somewhere...
    // (TODO how will we store this for later use?)
    req.session.access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'https://spotify-music-mapper.herokuapp.com/app'


    res.redirect(uri) // could redirect you to "logged in"
  })
})

