const router = require('express').Router()
module.exports = router

// router.use('/users', require('./users'))

router.use('/album', require('./albumRouter'))

router.use('/artistsPop', require('./artistPopRouter'))

router.use('/artistsFreq', require('./artistFreqRouter'))

router.use('/features', require('./featuresRouter'))

router.use('/playlist', require('./playlistRouter'))

router.use('/tracks', require('./tracksRouter'))

router.use('/lyrics', require('./lyricsRouter'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
