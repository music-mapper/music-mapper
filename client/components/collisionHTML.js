import React from 'react'
import * as d3 from 'd3'
import {gotAllLyrics} from '../store'
import {connect} from 'react-redux'

class BubbleChart extends React.Component {
  constructor(props) {
    super(props)
    this.createBubbleGraph = this.createBubbleGraph.bind(this)
  }
  async componentDidMount() {
    try {
      await this.props.gotAllLyrics()
      this.createBubbleGraph()
    } catch (error) {
      console.log('error in component did mount', error)
    }
  }
  createBubbleGraph() {
    let dataset = {children: this.props.lyrics.data}
    var width = window.innerWidth

    var height = window.innerHeight
    //FROM BUBBLE CHART


    //END OF BUBBLE CHART/////////////////////
    var nodes = d3.range(dataset.children.length).map(function(d, i) {
        return {r: dataset.children[i].Count}
      }),
      root = nodes[0]

      console.log("THIS IS NODES ", nodes)
    // Set a color scale to use when coloring in the different nodes in the chart
    const color = d3.scaleOrdinal(d3.schemeAccent)

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
    // console.log('THIS IS MY DATASET ', this.props.lyrics.data)
    if (this.props.lyrics.length === 0) {
      return <div>Loading...</div>
    }
    return <svg ref={node => (this.node = node)} width={0} height={0} />
  }
}

const mapStateToProps = state => ({
  lyrics: state.songs.lyrics
})

const mapDispatchToProps = dispatch => ({
  gotAllLyrics: () => dispatch(gotAllLyrics())
})

export default connect(mapStateToProps, mapDispatchToProps)(BubbleChart)

