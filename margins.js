const cache = require('./cache')

module.exports = function() {
  if (Date.now() - cache.margins.prev > 10) {
    var elm = document.documentElement
    var bod = document.body

    // document width is the max of the 3 tested sizes
    var width = elm.offsetWidth
    if (elm.scrollWidth > width) width = elm.scrollWidth
    if (bod.scrollWidth > width) width = bod.scrollWidth

    // same for document height
    var height = elm.offsetHeight
    if (elm.scrollHeight > height) height = elm.scrollHeight
    if (bod.scrollHeight > height) height = bod.scrollHeight

    cache.margins.data = {
       width: window.innerWidth,
      height: window.innerHeight,
        left: window.scrollX,
         top: window.scrollY,
       right: width  - window.innerWidth  - window.scrollX,
      bottom: height - window.innerHeight - window.scrollY
    }

    cache.margins.prev = Date.now()
  }

  return cache.margins.data
}
