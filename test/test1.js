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
    [1],
    [8]
  ])
  var weights = pack([1, 2])
  var grid = zeros([16])

  splat(grid, points, weights, 5)

  show(grid)

  t.equals(grid.get(1), 1)
  t.equals(grid.get(8), 2)

  t.end()
})
