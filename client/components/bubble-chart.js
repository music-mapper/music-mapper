import React from 'react'
import * as d3 from 'd3'
import {gotAllLyrics} from '../store'
import {connect} from 'react-redux'
import { create } from 'domain';

// var dataset = {
//   children: []
// }


class BubbleChart extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      children: []
    }
    this.createBubbleGraph = this.createBubbleGraph.bind(this)
  }
  async componentDidMount(){
    try {
      await this.props.gotAllLyrics()
      this.createBubbleGraph()

    } catch (error) {
      console.log('error in component did mount', error)

    }
    // await this.props.gotAllLyrics()
    // this.setState({children: this.props.lyrics})
    // this.createBubbleGraph()
    // if (this.props) {
    //   this.createBubbleGraph()

    // }
    console.log('within component did mount', this.props)
    // this.createBubbleGraph()
  }
  // componentDidUpdate() {
  //   if (this.props.lyrics.length > 0) {
  //     this.createBubbleGraph()
  //   }
  // }
  createBubbleGraph(){

    console.log('within create bubble graph', this.props.lyrics)

    // Set the overall diameter for the chart in pixels
    var diameter = 600
    // Set a color scale to use when coloring in the different nodes in the chart
    var color = d3.scaleOrdinal(d3.schemeAccent)
    // Load the data with the d3.pack() function to put it in a suitable form for bubble chart
    var bubble = d3
      .pack(this.props.lyrics)
      .size([diameter, diameter])
      .padding(1.5)
    // Select the div, add a svg, and modify the svg to set up the canvas for chart
    var svg = d3
      .select('body')
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble')

    // Define the hierarchy of the nodes
    // (not really important since there is no hierarchical organization yet)
    var nodes = d3.hierarchy(this.props.lyrics).sum(function(d) {
      return d.Count
    })

    // Takes all of the nodes above, creates a bubble for each,
    // and places them at the appropriate x/y coordinates in the svg
    // (this only adds elements to the graph, they have no size or color yet)
    var node = svg
      .selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d) {
        return !d.children
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })
    // Add a title to each node
    node.append('title').text(function(d) {
      return d.Name + ': ' + d.Count
    })
    // Add a circle around each node (this gives them size and color)
    node
      .append('circle')
      .attr('r', function(d) {
        return d.Count
      })
      .style('fill', function(d, i) {
        return color(i)
      })
      .transition()
      .attr("opacity", 0.5)
      .attr("opacity", 1)
      .duration(2500)
    // Add visible text to each node (title above maybe not visible?)
    node
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text(function(d) {
        console.log('INSIDE NODE', d.data)
        return d.r / 5
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', function(d) {
        return d.Count / 5
      })
      .attr('fill', 'white')
    // Add more visible text to show the data count in each node
    node
      .append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text(function(d) {
        return d.data.Count
      })
      .attr('font-family', 'Gill Sans', 'Gill Sans MT')
      .attr('font-size', function(d) {
        return d.r / 5
      })
      .attr('fill', 'white')
    // Set the overall height of the frame around the chart
    d3.select(self.frameElement).style('height', diameter + 'px')

    }
    render(){
      if (this.props.lyrics.length === 0) {
        return <div>Loading...</div>
      }
      console.log('inside render', this.props)
      // const lyrics = this.props.lyrics
      console.log('lyrics on props within render', this.props)
      return(
        <div>
        <div><h1>{this.props.lyrics.data[0].Name}</h1></div>
        <svg ref={node => this.node = node}
        width={0} height={0}></svg>
        </div>
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
