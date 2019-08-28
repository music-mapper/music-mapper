import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {gotAllFeatures} from '../store'
import Loading from './Loading'


export class Triangle extends React.Component{
  constructor(props){
    super(props)
    this.createTriangle = this.createTriangle.bind(this)
    this.addCoordinatesToData = this. addCoordinatesToData.bind(this)
  }
  async componentDidMount(){
    try{
    await this.props.gotAllFeatures()
    this.createTriangle()
    } catch (error) {
        console.log('error in component did mount', error)
    }
  }



 addCoordinatesToData () {
  const xCoords = [225,110,340,0,225,450];
  const yCoords = [0,200,200,400,400,400];

  const descriptions = {
    'Liveness': 'Detects the presence of an audience in the recording',
    'Acousticness': 'An average across all your tracks of Spotify\'s confidence measure of whether the track is acoustic',
    'Valence': 'A measure describing the musical positiveness: high valence sound more happy, tracks with low valence sound more sad',
    'Danceability': 'Describes how danceable a track is based on tempo, rhythm stability, beat strength, and overall regularity',
    'Energy': 'Represents a measure of intensity and activity—energetic tracks feel fast, loud, and noisy',
    'Speechiness': 'Detects the presence of spoken words'
  }

  for (let i = 0; i < xCoords.length; i++){
      this.props.features.data[i].xPosition = xCoords[i]
      this.props.features.data[i].yPosition = yCoords[i]
      this.props.features.data[i].description = descriptions[this.props.features.data[i].Name]
  }
    return this.props.features.data
  }

  createTriangle(){



    const dataset = {
      children: this.addCoordinatesToData()
        // top row
        // {Name: 'Liveness', Count: 49, xPosition: 225, yPosition: 0, hoverText: 'This is liveliness'},

        // middle row
        // {Name: 'Acousticness', Count: 90, xPosition: 110, yPosition: 200},
        // {Name: 'Valence', Count: 70, xPosition: 340, yPosition: 200},

        // bottom row
        // {Name: 'Dancibility', Count: 67, xPosition: 0, yPosition: 400},
        // {Name: 'Energy', Count: 40, xPosition: 225, yPosition: 400},
        // {Name: 'Speechiness', Count: 27, xPosition: 450, yPosition:400},
    }

    // Set the overall diameter for the chart in pixels
const diameter = 700
// Set a color scale to use when coloring in the different nodes in the chart
const color = d3.scaleOrdinal(d3.schemeAccent)
// Load the data with the d3.pack() function to put it in a suitable form for bubble chart
const bubble = d3
  .pack(dataset)
  .size([diameter, diameter])
  .padding(1.5)
// Select the div, add a svg, and modify the svg to set up the canvas for chart
const svg = d3
  .select('#triangle')
  .append('svg')
  .attr('width', diameter)
  .attr('height', diameter)
  .attr('class', 'bubble')

// Create a div element to use for hovertext
let div = d3.select('#triangle').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

// Define the hierarchy of the nodes?
const nodes = d3.hierarchy(dataset).sum(function(d) {
  return d.Count
})

// Takes all of the nodes above
// and places them at the appropriate x/y coordinates (so they are in a triangle form) in the svg
// (this only adds elements to the graph, they have no size or color yet or shape yet)
const node = svg
  .selectAll('.node')
  .data(bubble(nodes).descendants())
  .enter()
  .filter(function(d) {
    return !d.children
  })
  .append('g')
  .attr('class', 'node')
  .attr('transform', function(d) {
  return 'translate(' + (20 +  Number(d.data.xPosition)) + `,` + (20 + Number(d.data.yPosition)) + `)`
  })


//FILL EACH NODE WITH 'WATER VIA GRADIENT METHOD (WHITE AND BLUE)
const defs = node.append("defs")
const linearGradient = defs.append("linearGradient")
.attr("id", function(d) {
  return `${d.data.Name}`
})
.attr("y1", "100%")
.attr("y2", "0%")
.attr("x1", "0%")
.attr("x2", "0%")

const dur = 3000

linearGradient.append("stop")
.attr("stop-color", '#CEECF5')
.attr('offset', function(d) {
  return `${d.data.Count- d.data.Count}%`
})
.transition()
.duration(dur)
.attr('offset', function(d) {
  return `${d.data.Count*.2}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.4}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.6}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.8}%`
})
.attr('offset', function(d) {
  return `${d.data.Count}%`
})


linearGradient.append("stop")
.attr("stop-color", 'white')
.attr('offset', function(d) {
  return `${d.data.Count- d.data.Count}%`
})
.transition()
.duration(dur)
.attr('offset', function(d) {
  return `${d.data.Count*.2}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.4}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.6}%`
})
.attr('offset', function(d) {
  return `${d.data.Count*.8}%`
})
.attr('offset', function(d) {
  return `${d.data.Count}%`
})


//make each node ellipse color
const ellipse = node.append('ellipse')

//add attributes to the ellipse
const size = 100
ellipse
.attr('cx', size)
.attr('cy', size)
.attr('rx', size)
.attr('ry', size)
.attr('stroke', function(d, i) {
  return color(i)
})
.attr('stroke-width', 8)
.style("fill", function(d) {
  return `url(#${d.data.Name})`
})
.on("mouseover", function(d) {
  div.transition()
      .duration(200)
      .style("opacity", .9);
  div.html(d.data.description)
      .style("left", (d3.event.pageX) + "px")
      // .style('left', (d.data.xPosition) + 'px')
      // .style('top', (d.data.yPosition) + 'px')
      .style("top", (d3.event.pageY - 28) + "px");
  })
.on("mouseout", function(d) {
    div.transition()
        .duration(500)
        .style("opacity", 0);
})
.attr('stroke-lincap', 'butt')
.attr('stroke-line-join', 'miter')


//add TEXT: AUDIO FEATURE
node
  .append('text')
  .attr('dy', '60')
  .attr('dx', '100')

  .style('text-anchor', 'middle')
  .text(function(d) {
    return `${d.data.Name} ♪`
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', 22)
  .attr('fill', 'black')

//add TEXT: PERCENTAGE OF AUDIO FEATURE
const dur2  = dur/6
node
  .append('text')
  .attr('dy', '85')
  .attr('dx', '100')
  .style('text-anchor', 'middle')
  .text(function(d) {
    return `${d.data.Count-d.data.Count} %`
  })
.transition()
.duration(dur2)
.text(function(d) {
  return `${Math.floor(d.data.Count*.2)} %`
})
.transition()
.duration(dur2)
.text(function(d) {
  return `${Math.floor(d.data.Count*.4)} %`
})
.transition()
.duration(dur2)
.text(function(d) {
  return `${Math.floor(d.data.Count*.6)} %`
})
.transition()
.duration(dur2)
.text(function(d) {
  return `${Math.floor(d.data.Count*.8)} %`
})
.transition()
.duration(dur2)
.text(function(d) {
  return `${Math.floor(d.data.Count)} %`
})

  .attr('font-family', 'Gill Sans', 'Gill Sans MT')
  .attr('font-size', 20)
  .attr('fill', 'black')


// Set the overall height of the frame around the chart
// d3.select(self.frameElement).style('height', diameter + 'px')

  }
  render(){
    let {loading} = this.props
    if (loading) {
      return <Loading />
    }
    return(
      <div id='triangle'> </div>
      // <svg ref={node => this.node = node}
      // width={0} height={0}></svg>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.audioFeatures.loading,
  features: state.audioFeatures.features
})

const mapDispatchToProps = (dispatch) => ({
  gotAllFeatures: () => dispatch(gotAllFeatures())
})

export default connect(mapStateToProps, mapDispatchToProps)(Triangle)
