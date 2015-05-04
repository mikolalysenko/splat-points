'use strict'

var ndarray = require('ndarray')
var dirichlet = require('dirichlet')

//Use optimized modules for lower dimensional case
var splat1D = require('splat-points-1d')
var splat2D = require('splat-points-2d')
var splat3D = require('splat-points-3d')

module.exports = splat

//Slow generic routine
function splatND(out, points, weights, radius) {
  var n = points.shape[0]
  var d = points.shape[1]
  var lo = new Array(d)
  var hi = new Array(d)
  var bounds = out.shape
  var coord = new Array(d+1)
  var w = 1.0
  function splatRec(k) {
    if(k < 0) {
      coord[d] = out.get.apply(out, coord) + w
      out.set.apply(out, coord)
      return
    }
    var wprev = w
    var x = points.get(i, k)
    for(coord[k]=lo[k]; coord[k]<hi[k]; ++coord[k]) {
      w = wprev * dirichlet(bounds[k], coord[k] - x)
      splatRec(k-1)
    }
    w = wprev
  }

  for(var i=0; i<=d; ++i) {
    coord[i] = 0
  }

  for(var i=0; i<n; ++i) {
    for(var j=0; j<d; ++j) {
      var x = points.get(i,j)
      lo[j] = Math.max(x-radius, 0)
      hi[j] = Math.min(x+radius, bounds[j]-1)
    }
    w = weights.get(i)
    splatRec(d-1)
  }
}

function splat(out, points, weights, radius) {
  var d  = points.shape[1]
  if(Array.isArray(weights)) {
    weights = ndarray(weights)
  } else if(typeof weights === 'number') {
    weights = ndarray([+weights], [points.shape[0]], [0], 0)
  } else if(!weights) {
    weights = ndarray([1], [points.shape[0]], [0], 0)
  }
  if(!radius) {
    radius = 8
  }
  switch(d) {
    case 0:
    break
    case 1:
      splat1D(out, points, weights, radius)
    break
    case 2:
      splat2D(out, points, weights, radius)
    break
    case 3:
      splat3D(out, points, weights, radius)
    break
    default:
      splatND(out, points, weights, radius)
    break
  }
  return out
}
