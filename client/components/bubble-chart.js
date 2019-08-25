import React from 'react'
import * as d3 from 'd3'
import {gotAllLyrics} from '../store'
import {connect} from 'react-redux'

class BubbleChart extends React.Component{
  constructor(props){
    super(props)
    this.createBubbleGraph = this.createBubbleGraph.bind(this)
  }
  async componentDidMount(){
    try {
      await this.props.gotAllLyrics()
      this.createBubbleGraph()

    } catch (error) {
      console.log('error in component did mount', error)

    }
  }
  createBubbleGraph(){
    let dataset = {
      children: this.props.lyrics.data
    }
    // Set the overall diameter for the chart in pixels
    const diameter = 600
    // Set a color scale to use when coloring in the different nodes in the chart
    const color = d3.scaleOrdinal(d3.schemeAccent)
    // Load the data with the d3.pack() function to put it in a suitable form for bubble chart
    let bubble = d3
      .pack(dataset)
      .size([diameter, diameter])
      .padding(1.5)
    // Select the div, add a svg, and modify the svg to set up the canvas for chart
    let svg = d3
      .select('body')
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble')
    // Define the hierarchy of the nodes
    // (not really important since there is no hierarchical organization yet)
    let nodes = d3.hierarchy(dataset).sum((d) => d.Count)
    // Takes all of the nodes above, creates a bubble for each,
    // and places them at the appropriate x/y coordinates in the svg
    // (this only adds elements to the graph, they have no size or color yet)
    let node = svg
      .selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter((d) => !d.children)
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
    // Add a title to each node
    node.append('title').text((d) => d.Name + ': ' + d.Count)
    // Add a circle around each node (this gives them size and color)
    node
      .append('circle')
      .attr('r', (d) => d.r)
      .style('fill', (d, i) => color(i))
      .transition()
      .attr("opacity", 0.5)
      .attr("opacity", 1)
      .duration(2500)
    // Add visible text to each node (title above maybe not visible?)
    node
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.Name.substring(0, d.r / 3))
      .attr('font-family', 'sans-serif')
      .attr('font-size', (d) => d.r / 5)
      .attr('fill', 'white')
    // Add more visible text to show the data count in each node
    node
      .append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.Count)
      .attr('font-family', 'Gill Sans', 'Gill Sans MT')
      .attr('font-size', (d) => d.r / 5)
      .attr('fill', 'white')
    // Set the overall height of the frame around the chart
    d3.select(self.frameElement).style('height', diameter + 'px')
    }
    render(){
      if (this.props.lyrics.length === 0) {
        return <div>Loading...</div>
      }
      return(
        <svg ref={node => this.node = node}
        width={0} height={0}></svg>
      )
    }
  }

const mapStateToProps = (state) => ({
  lyrics: state.songs.lyrics
})

const mapDispatchToProps = (dispatch) => ({
  gotAllLyrics: () => dispatch(gotAllLyrics())
})

export default connect(mapStateToProps, mapDispatchToProps)(BubbleChart)


//replace "d3.geom.quadtree" with "d3.quadtree"
//replace "d3.scale.category10" with "d3.scaleOrdinal(d3.schemeCategory10)"
//replace "d3.layout.force" with "d3.forceSimulation"

//chargeForce, forceX, and forceY need to be added for .forceSimulation()
    // var chargeForce = d3.forceManyBody()
    // const forceX = d3.forceX(width / 2).strength(0.5)
    // const forceY = d3.forceY(height / 2).strength(0.5)


    //  var force = d3
    //    .forceSimulation()
    //    .force('charge', chargeForce)
    //    .force('x', forceX)
    //    .force('y', forceY)
