const unsplash = data => ({
  id: data.id,
  url: data.urls.regular,
  download: data.links.html
})

const pixabay = data => ({
  id: data.id,
  url: data.webformatURL,
  download: data.pageURL,
})

const flickr = data => ({
  id: data.id,
  url: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`,
  download: `https://www.flickr.com/photos/${data.owner}/${data.id}`,
})

const giphy = data => ({
  id: data.id,
  url: data.images.fixed_height.url,
  download: data.url,
})

module.exports = {
  unsplash: unsplash,
  pixabay: pixabay,
  flickr: flickr,
  giphy: giphy,
}
