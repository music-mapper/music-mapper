const router = require('express').Router()
module.exports = router

// router.use('/users', require('./users'))

router.use('/album', require('./albumRouter'))

router.use('/artist', require('./artistRouter'))

router.use('/features', require('./featuresRouter'))

router.use('/playlist', require('./playlistRouter'))

router.use('/tracks', require('./tracksRouter'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
