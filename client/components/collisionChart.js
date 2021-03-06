import React from 'react'
import * as d3 from 'd3'
import {gotAllLyrics} from '../store'
import {connect} from 'react-redux'
import Loading from './Loading'
import ErrorPage from './error'

class CollisionChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false
    }
    this.createBubbleGraph = this.createBubbleGraph.bind(this)
  }
  async componentDidMount() {
    try {
      await this.props.gotAllLyrics()
      this.createBubbleGraph()
    } catch (error) {
      this.setState({
        showError: true
      })
    }
  }
  createBubbleGraph() {
    let dataset = {children: this.props.lyrics.data}
    const width = window.innerWidth
    const height = window.innerHeight

    //Takes the length of our dataset and makes an array of length hodes.
    //Then we map through each node and make its size equivalent to the count in our dataset
    let nodes = d3.range(dataset.children.length).map(function(d, i) {
      return {
        r: dataset.children[i].Count * 3,
        name: dataset.children[i].Name,
        count: dataset.children[i].Count
      }
    })

    let root = nodes[0]

    // Set a color scale to use when coloring in the different nodes in the chart
    const color = d3.scaleOrdinal(d3.schemeSet2)

    root.radius = 0
    root.fixed = true

    //impacts starting x and y axis of bubble
    const forceX = d3.forceX(width / 2).strength(0.015)
    const forceY = d3.forceY(height / 2).strength(0.015)

    let force = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force('x', forceX)
      .force('y', forceY)
      .force(
        'collide',
        d3
          .forceCollide()
          .radius(function(d) {
            if (d === root) {
              return Math.random() * 50 + 100
            }
            return d.r + 0.5
          })
          .iterations(5)
      )
      .nodes(nodes)
      .on('tick', ticked)

    let svg = d3
      .select('#collision-chart')
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
        return color(i)
      })

    let label = svg
      .selectAll('.mytext')
      .data(nodes.slice(1))
      .enter()
      .append('text')
      .text(d => `${d.name}`)
      .style('text-anchor', 'middle')
      .style('font-size', d => d.r / 3)
      .attr('fill', 'white')

    let label2 = svg
      .selectAll('.mytext')
      .data(nodes.slice(1))
      .enter()
      .append('text')
      .text(d => `${d.count}`)
      .style('text-anchor', 'middle')
      .style('font-size', d => d.r / 5)
      .attr('fill', 'white')

    function ticked(e) {
      svg
        .selectAll('circle')
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })
      //this sets the x and y coordinates of my labels
      label
        .attr('x', function(d) {
          return d.x
        })
        .attr('y', function(d) {
          return d.y
        })

      label2
        .attr('x', function(d) {
          return d.x
        })
        .attr('y', function(d) {
          return d.y + 15
        })
    }

    svg.on('mousemove', function() {
      let p1 = d3.mouse(this)
      root.fx = p1[0]
      root.fy = p1[1]
      force.alphaTarget(0.3).restart() //reheat the simulation
    })
  }
  render() {
    let {loading} = this.props
    if (loading) {
      return <Loading />
    } else if (this.state.showError === true) {
      return <ErrorPage />
    }
    return <div><div id="collision-chart"></div>
     <a href ="https://www.musixmatch.com/"><img className="powered-by" src="https://morganfeir.s3.us-east-2.amazonaws.com/badge+full.png" /></a> </div>
  }
}

const mapStateToProps = state => ({
  loading: state.songs.loading,
  lyrics: state.songs.lyrics
})

const mapDispatchToProps = dispatch => ({
  gotAllLyrics: () => dispatch(gotAllLyrics())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollisionChart)

