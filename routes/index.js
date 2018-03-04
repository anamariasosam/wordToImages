const express = require('express')
const network = require('../controllers')

const router = express.Router()

router.get('/unsplash', network.unsplash)
router.get('/pixabay', network.pixabay)
router.get('/flickr', network.flickr)
router.get('/giphy', network.giphy)

module.exports = router
