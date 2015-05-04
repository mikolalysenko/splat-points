splat-points
============
Splats a sparse set of points into an ndarray using a Dirichlet kernel.  If you want some
alternative kernel to filter them after the fact, you can apply a convolution to the resulting array as a post process.

# Example

```javascript
var ndarray = require('ndarray')
var splat   = require('splat-points')
var zeros   = require('zeros')
var show    = require('ndarray-show')

var points  = ndarray([
  0, 0,
  80, 50,
  0.3, 76,
  100, 22.3
], [4,2], [2,1])

var grid = splat(zeros([128, 128]), points)

show(grid)
```

# API

#### `require('splat-points')(out, points[, weights, radius])`
Splats a sparse set of points onto an array using a Dirichlet kernel.

* `out` is the array which is splatted onto
* `points` is an `n`-by-`d` dimensional ndarray of points
* `weights` is an array of weights (either an ndarray or a flat)
* `radius` is the radius of the points to splat

**Returns** `out`

# License
(c) 2015 Mikola Lysenko. MIT License
