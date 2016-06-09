# viewport-funcs

> A very limited subset of viewport functions I use every day

## Install

```bash
npm i viewport-funcs
```

Package [on npm](https://www.npmjs.com/package/viewport-funcs)

## require

```js
// require all functions
const contains = require('viewport-funcs').contains

// require only the single function (recommanded)
const contains = require('viewport-funcs/contains')
```

## API

* [contains](#containsel-offset)
* [margins](#margins)
* [rect](#rect)

#### contains(el, [offset], [checksize])

Check if the element `el` is in the viewport, return a boolean

The argument `offset` is optional, default to `0`

The argument `checksize` is optional, default to `false`

If `checksize` is `true` and the element has no size (an empty div or an img with no src), `contains` will always return `false`

```js
const contains = require('viewport-funcs/contains')

var el = document.querySelector('.rect')

// true if the element is fully or partially in the viewport
contains(el)
```

---

#### margins()

Get the viewport size and margins

`left`, `top`, `right` and `bottom` are relative to each side of the document

The object returned contains:

| Key | Value |
| :------ | :------- |
| **width** | the viewport width |
| **height** | the viewport height |
| **left** | the `margin-left`, distance between the left of the document and the left of the viewport |
| **top** | the `margin-top`, distance between the top of the document and the top of the viewport |
| **right** | the `margin-right`, distance between the right of the document and the right of the viewport |
| **bottom** | the `margin-bottom`, distance between the bottom of the document and the bottom of the viewport |

The example below shows:
* how to get the viewport bottom-right corner location
* how to get the document width and height

```js
const margins = require('viewport-funcs/margins')

// {width: 591, height: 328, left: 0, top: 56, right: 0, bottom: 316}
var data = margins()

/*
the viewport bottom-right corner location
{x: 591, y: 384}
*/
var br = {x: data.left + data.width, y: data.top + data.height}

/*
the document width and height
{width: 591, height: 700}
*/
var doc = {
   width: data.left + data.width  + data.right,
  height: data.top  + data.height + data.bottom
}
```

The returned object is internally cached to boost performance

---

#### rect()

Get the viewport size and position

`left`, `top`, `right` and `bottom` are relative to the top-left of the document

The object returned contains:

| Key | Value |
| :------ | :------- |
| **width** | the viewport width |
| **height** | the viewport height |
| **left** | the distance between the left of the document and the left of the viewport |
| **top** | the distance between the top of the document and the top of the viewport |
| **right** | the distance between the left of the document and the right of the viewport |
| **bottom** | the distance between the top of the document and the bottom of the viewport |

This means:
* `right` = `left` + `width`
* `bottom` = `top` + `height`

The returned object is internally cached to boost performance

```js
const rect = require('viewport-funcs/rect')

// {width: 800, height: 600, left: 10, top: 10, right: 810, bottom: 610}
rect()
```

## Thanks

Mainly forked / inspired on
- [in-viewport](https://github.com/vvo/in-viewport)

Performance and tips from
- [documentWidth/Height is the max of 3 tested sizes](http://ryanve.com/lab/dimensions/#document)
- [check if the element is visible](https://github.com/jquery/jquery/blob/0402963845be8d71c4e8ddf65e7c055014739b60/src/css/hiddenVisibleSelectors.js#L10)

## License

MIT
