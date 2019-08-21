const router = require('express').Router()
let request = require('request')
let querystring = require('querystring')
module.exports = router

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/auth/spotify/callback'
let access_token = ''


router.get('/login', function(req, res) {
  console.log('Logging in...')
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-library-read user-follow-read playlist-read-private',
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
    global.access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:8888'
    res.redirect(uri) // could redirect you to "logged in"
  })
})


router.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

