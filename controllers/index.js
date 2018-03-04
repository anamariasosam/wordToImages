const superagent = require('superagent')

const normalizers = require('./normalizeData')

const PACKAGE =  require('../package.json')
const TOKENS = {
  unsplash: PACKAGE.config.UNSPLASH_CLIENT_ID,
  pixabay: PACKAGE.config.PIXABAY_KEY,
  flickr: PACKAGE.config.FLICKR_API_KEY,
}

exports.unsplash = function(req, res) {
  const { word = '' } = req.query || {}

  superagent
    .get('https://api.unsplash.com/search/photos')
    // .timeout({ response: 5000 })
    .query({
      client_id: TOKENS.unsplash,
      per_page: 20,
      query: word
    })
    .end((err, data = {text: ""}) => {
      if (err) { return res.status(500).send({ error: 'Something failed!' + err }) }

      res.json(normalizeData(JSON.parse(data.text).results, 'unsplash'))
    })
}

exports.pixabay = function(req, res) {
  const { word = '' } = req.query || {}
  superagent
    .get('https://pixabay.com/api/')
    .query({
      key: TOKENS.pixabay,
      image_type: 'photo',
      q: word
    })
    .end((err, data = {text: ""}) => {
      if (err) { return res.status(500).send({ error: 'Something failed!' + err }) }

      res.json(normalizeData(JSON.parse(data.text).hits, 'pixabay'))
    })
}

exports.flickr = function(req, res) {
  const { word = '' } = req.query || {}

  superagent
    .get('https://api.flickr.com/services/rest/?method=flickr.photos.search')
    .query({
      api_key: TOKENS.flickr,
      license: 5,
      tags: word,
      format: 'json',
      nojsoncallback: true,
      content_type: 1,
      media: 'photos',
      per_page: 10,
      in_gallery: true
     })
    .end((err, data = {text: ""}) => {
      if (err) { return res.status(500).send({ error: 'Something failed!' + err }) }

      res.json(normalizeData(JSON.parse(data.text).photos.photo, 'flickr'))
    })

}

function normalizeData(array = [], from) {
  return array.reduce(function(accumulator, element) {

    switch (from) {
      case 'unsplash':
        return [ ...accumulator,  normalizers.unsplash(element) ]
      case 'pixabay':
        return [ ...accumulator,  normalizers.pixabay(element) ]
      case 'flickr':
        return [ ...accumulator,  normalizers.flickr(element) ]
      default:
        return []
    }

  }, [])
}
