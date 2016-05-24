
exports.contains = contains
exports.margins  = margins
exports.rect     = rect

var cache = {
  rect: {
    prev: 0,
    data: null
  },
  margins: {
    prev: 0,
    data: null
  }
}

function rect() {
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

function margins() {
  if (Date.now() - cache.margins.prev > 10) {
    var elm = document.documentElement
    var bod = document.body

    // documentWidth/Height is the max of the 3 tested sizes
    var width = elm.offsetWidth
    if (elm.scrollWidth > width) width = elm.scrollWidth
    if (bod.scrollWidth > width) width = bod.scrollWidth

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

function contains(el, offset, checksize) {
  if (!document.body.contains(el)
    || el.getClientRects().length == 0) return false

  if (checksize === true
    && (el.offsetWidth == 0 || el.offsetHeight == 0)) return false

  offset = safe(offset)
  var r = el.getBoundingClientRect()

  return r.right  >= -offset
    &&   r.left   <= window.innerWidth  + offset
    &&   r.top    <= window.innerHeight + offset
    &&   r.bottom >= -offset
}

function safe(offset) {
  return offset == undefined || typeof offset != 'number' || offset !== offset
    ? 0
    : offset
}
