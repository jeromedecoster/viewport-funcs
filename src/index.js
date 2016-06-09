const contains = require('../contains')
const margins  = require('../margins')
const rect     = require('../rect')

//
// RECT
//

function rectLog() {
  var data = rect()
  var el = document.querySelector('.rect')
  for (var k in data) {
    el.querySelector(`td[${k}]`).textContent = data[k]
  }
}

rectLog()
window.addEventListener('resize', rectLog)
window.addEventListener('scroll', rectLog)
window.addEventListener('click',  rectLog)

//
// MARGINS
//

function marginsLog() {
  var data = margins()
  var el = document.querySelector('.margins')
  for (var k in data) {
    el.querySelector(`td[${k}]`).textContent = data[k]
  }
}

marginsLog()
window.addEventListener('resize', marginsLog)
window.addEventListener('scroll', marginsLog)
window.addEventListener('click',  marginsLog)

//
// IN_VIEWPORT
//

var red     = document.querySelector('.red')
var green   = document.querySelector('.green')
var blue    = document.querySelector('.blue')
var none    = document.querySelector('.none')
var created = document.createElement('img')

function containsLog() {
  var el = document.querySelector('.contains')
  var offset = +el.querySelector('input[offset]').value
  var checked = el.querySelector('input[checksize]').checked
  el.querySelector('td[red]').textContent     = contains(red,     offset, checked)
  el.querySelector('td[green]').textContent   = contains(green,   offset, checked)
  el.querySelector('td[blue]').textContent    = contains(blue,    offset, checked)
  el.querySelector('td[none]').textContent    = contains(none,    offset, checked)
  el.querySelector('td[created]').textContent = contains(created, offset, checked)
}

containsLog()
window.addEventListener('resize', containsLog)
window.addEventListener('scroll', containsLog)
window.addEventListener('click',  containsLog)
