import React from 'react'
import * as d3 from 'd3'

const data = [
  { date: 1950, Rock: 8,  Pop: 5, Country: 2, RnB: 1, Jazz: 9},
  { date: 1960, Rock: 9,  Pop: 7, Country: 5, RnB: 2, Jazz: 3},
  { date: 1970, Rock: 5,  Pop: 9, Country: 4, RnB: 4, Jazz: 6},
  { date: 1980, Rock: 3,  Pop: 10, Country:4, RnB: 8, Jazz: 2},
  { date: 1990, Rock: 4,  Pop: 9, Country: 5, RnB: 8, Jazz: 1},
]

export default class StreamGraph extends React.Component{
  constructor(props){
    super()
  }
  componentDidMount(){
    this.createStreamGraph()
  }
  componentDidUpdate(){
    this.createStreamGraph()
  }
  createStreamGraph(){
    var n = 5, // number of layers
    m = 5, // number of samples per layer
    stack = d3.stack().keys(d3.range(n).map(function (d) { return "layer"+d; })).offset(d3.stackOffsetNone);

// Create empty data structures
var matrix0 = d3.range(m).map(function (d) { return { x:d }; });
var matrix1 = d3.range(m).map(function (d) { return { x:d }; });

// Fill them with random data
d3.range(n).map(function(d) { bumpLayer(m, matrix0, d); });
d3.range(n).map(function(d) { bumpLayer(m, matrix1, d); });

var layers0 = stack(matrix0),
    layers1 = stack(matrix1);

var width = 960,
    height = 500;

var x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([d3.min(layers0.concat(layers1), function(layer) { return d3.min(layer, function(d) { return d[0]; }); }), d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d[1]; }); })])
    .range([height, 0]);

var color = d3.scaleOrdinal()
.range(d3.schemeCategory10)

var area = d3.area()
    .x(function(d,i) { return x(d.data.x); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(layers0)
  .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); });

function transition() {
  d3.selectAll("path")
      .data(function() {
        var d = layers1;
        layers1 = layers0;
        return layers0 = d;
      })
    .transition()
      .duration(2500)
      .attr("d", area);
}

// Inspired by Lee Byron's test data generator.
function bumpLayer(n, matrix, layer) {

  function bump(a) {
    let x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  var a = [], i;
  var i;
  for (i = 0; i < n; ++i) a[i] = 0;
  for (i = 0; i < 5; ++i) bump(a);
  return a.forEach(function(d, i) { matrix[i]["layer"+layer]=Math.max(0, d)+1; });
}
  }
  render(){
    return(
      <svg ref={node => this.node =node} width={0} height={0}></svg>
    )
  }
}
