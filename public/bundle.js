(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
    return {
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

function contains(el, offset) {
  if (!document.body.contains(el)
    || el.offsetWidth == 0
    || el.offsetHeight == 0
    || el.getClientRects().length == 0) return false

  offset = offset == undefined ? 0 : safe(offset)
  var r = el.getBoundingClientRect()

  return r.right  >= -offset
    &&   r.left   <= window.innerWidth  + offset
    &&   r.top    <= window.innerHeight + offset
    &&   r.bottom >= -offset
}

function safe(offset) {
  return typeof offset != 'number' || offset !== offset || offset < 0
    ? 0
    : offset
}

},{}],2:[function(require,module,exports){

const contains = require('..').contains
const margins  = require('..').margins
const rect     = require('..').rect

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
  el.querySelector('td[red]').textContent     = contains(red, offset)
  el.querySelector('td[green]').textContent   = contains(green, offset)
  el.querySelector('td[blue]').textContent    = contains(blue, offset)
  el.querySelector('td[none]').textContent    = contains(none, offset)
  el.querySelector('td[created]').textContent = contains(created, offset)
}

containsLog()
window.addEventListener('resize', containsLog)
window.addEventListener('scroll', containsLog)
window.addEventListener('click',  containsLog)

},{"..":1}]},{},[2]);
