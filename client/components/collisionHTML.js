import React from 'react'
import * as d3 from 'd3'

var dataset = {
  children: [
    {Name: 'Basil', Count: 5},
    {Name: 'cute', Count: 2},
    {Name: 'pup', Count: 2},
    {Name: 'walk', Count: 1},
    {Name: 'break', Count: 1},
    {Name: 'gotta', Count: 1},
    {Name: 'be', Count: 1},
    {Name: 'super', Count: 3},
    {Name: 'duper', Count: 2}
  ]
}

// Set the overall diameter for the chart in pixels
export default class BubbleChart extends React.Component {
  constructor(props) {
    super(props)
    this.createBubbleGraph = this.createBubbleGraph.bind(this)
  }
  componentDidMount() {
    this.createBubbleGraph()
  }
  componentDidUpdate() {
    this.createBubbleGraph()
  }
  createBubbleGraph() {
    var width = window.innerWidth
    var height = window.innerHeight

    var nodes = d3.range(200).map(function() {
        return {r: Math.random() * 12 + 4}
      }),
      root = nodes[0]
    var color = d3.scaleOrdinal(d3.schemeCategory10)

    root.radius = 0
    root.fixed = true

    const forceX = d3.forceX(width / 2).strength(0.015)
    const forceY = d3.forceY(height / 2).strength(0.015)

    var force = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force('x', forceX)
      .force('y', forceY)
      .force('collide', d3
          .forceCollide()
          .radius(function(d) {
            if (d === root) {
              return Math.random() * 50 + 100
            }
            return d.r + 0.5
          })
          .iterations(5))
      .nodes(nodes)
      .on('tick', ticked)

    var svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg
      .selectAll('circle')
      .data(nodes.slice(1))
      .enter()
      .append('circle')
      .attr('r', function(d) {
        return d.r
      })
      .style('fill', function(d, i) {
        return color(i % 3)
      })

    function ticked(e) {
      svg
        .selectAll('circle')
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })
    }

    svg.on('mousemove', function() {
      var p1 = d3.mouse(this)
      root.fx = p1[0]
      root.fy = p1[1]
      force.alphaTarget(0.3).restart() //reheat the simulation
    })
  }
  render() {
    return <svg ref={node => (this.node = node)} width={0} height={0} />
  }
}


