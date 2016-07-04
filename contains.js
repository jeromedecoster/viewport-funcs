const setNumber = require('set-funcs/set-number')
const isNode = require('is-funcs/is-node')

module.exports = function(el, offset, check) {
  if (check === true) {
    if (isNode(el) === false || el.offsetWidth == 0 || el.offsetHeight == 0) return false
  }

  offset = setNumber(offset)
  var r = el.getBoundingClientRect()

  return r.right  >= -offset
    &&   r.left   <= window.innerWidth  + offset
    &&   r.top    <= window.innerHeight + offset
    &&   r.bottom >= -offset
}
