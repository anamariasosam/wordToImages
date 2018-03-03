const superagent = require('superagent')

const normalizers = require('./normalizeData')

const PACKAGE =  require('../package.json')
const TOKENS = {
  unsplash: PACKAGE.config.UNSPLASH_CLIENT_ID,
  pixabay: PACKAGE.config.PIXABAY_KEY,
}

exports.unsplash = function(req, res) {
  const { word = '' } = req.query || {}

  superagent
    .get('https://api.unsplash.com/search/photos')
    // .timeout({ response: 5000 })
    .query({ client_id: TOKENS.unsplash })
    .query({ page: 1 })
    .query({ query: word })
    .end((err, data = {text: ""}) => {
      if (err) { return res.status(500).send({ error: 'Something failed!' + err }) }

      res.json(normalizeData(JSON.parse(data.text).results, 'unsplash'))
    })
}

exports.pixabay = function(req, res) {
  const { word = '' } = req.query || {}
  superagent
    .get('https://pixabay.com/api/')
    .query({ key: TOKENS.pixabay })
    .query({ image_type: 'photo' })
    .query({ q: word })
    .end((err, data = {text: ""}) => {
      if (err) { return res.status(500).send({ error: 'Something failed!' + err }) }

      res.json(normalizeData(JSON.parse(data.text).hits, 'pixabay'))
    })
}

function normalizeData(array = [], from) {
  return array.reduce(function(accumulator, element) {

    switch (from) {
      case 'unsplash':
        return [ ...accumulator,  normalizers.unsplash(element) ]
      case 'pixabay':
        return [ ...accumulator,  normalizers.pixabay(element) ]
      default:
        return []
    }

  }, [])
}
