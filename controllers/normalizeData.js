const unsplash = data => ({
  id: data.id,
  url: data.urls.regular,
  download: data.links.download,
  small: data.urls.thumb,
})

module.exports = {
  unsplash: unsplash,
}
