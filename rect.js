const cache = require('./cache')

module.exports = function() {
  if (Date.now() - cache.rect.prev > 10) {
    cache.rect.data = {
       width: window.innerWidth,
      height: window.innerHeight,
        left: window.scrollX,
         top: window.scrollY,
       right: window.scrollX + window.innerWidth,
      bottom: window.scrollY + window.innerHeight
    }

    cache.rect.prev = Date.now()
  }

  return cache.rect.data
}
