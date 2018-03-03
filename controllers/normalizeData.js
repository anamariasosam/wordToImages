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

module.exports = {
  unsplash: unsplash,
  pixabay: pixabay,
}
