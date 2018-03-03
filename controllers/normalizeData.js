const unsplash = data => ({
  id: data.id,
  url: data.urls.regular,
  download: data.links.download
})

module.exports = {
  unsplash: unsplash,
}
