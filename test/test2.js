"use strict"

var tape = require("tape")
var show = require('ndarray-show')
var ndarray = require("ndarray")
var dirichlet = require("dirichlet")
var pack = require("ndarray-pack")
var splat = require("../splat")
var zeros = require("zeros")

tape("simple splat", function(t) {
  var points = pack([
    [1, 0],
    [0, 4]
  ])
  var weights = pack([1, 2])
  var grid = zeros([8, 8])

  splat(grid, points, weights, 5)

  t.equals(grid.get(1, 0), 1)
  t.equals(grid.get(0, 4), 2)

  t.end()
})
