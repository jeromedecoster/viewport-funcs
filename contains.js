const isNumber = require('is-funcs/is-number')
const isNode = require('is-funcs/is-node')

module.exports = function(el, offset, checksize) {
  if (isNode(el) === false) return false

  if (checksize === true
    && (el.offsetWidth == 0 || el.offsetHeight == 0)) return false

  offset = isNumber(offset) ? offset : 0
  var r = el.getBoundingClientRect()

  return r.right  >= -offset
    &&   r.left   <= window.innerWidth  + offset
    &&   r.top    <= window.innerHeight + offset
    &&   r.bottom >= -offset
}
