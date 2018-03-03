const express = require('express')
const network = require('../controllers')

const router = express.Router()

router.get('/unsplash', network.unsplash)

module.exports = router
