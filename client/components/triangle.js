import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {gotAllFeatures} from '../store'



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
    for (let i = 0; i < xCoords.length; i++){
    this.props.features.data[i].xPosition = xCoords[i]
    this.props.features.data[i].yPosition = yCoords[i]
    }
    return this.props.features.data
  }

  createTriangle(){



    const dataset = {
      children: this.addCoordinatesToData()

        // //top row
        // {Name: 'Liveness', Count: 49, xPosition: 225, yPosition: 0},

        // //middle row
        // {Name: 'Acousticness', Count: 90, xPosition: 110, yPosition: 200},
        // {Name: 'Valence', Count: 70, xPosition: 340, yPosition: 200},

        // //middle bottom row
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
  .select('body')
  .append('svg')
  .attr('width', diameter)
  .attr('height', diameter)
  .attr('class', 'bubble')

// Define the hierarchy of the nodes?
const nodes = d3.hierarchy(dataset).sum(function(d) {
  return d.Count
})

// Takes all of the nodes above
// and places them at the appropriate x/y coordinates in the svg
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


//FILL EACH NODE WITH 'WATER
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
.attr('stroke-width', 15)
.style("fill", function(d) {
  return `url(#${d.data.Name})`
})

.attr('stroke-lincap', 'butt')
.attr('stroke-line-join', 'miter')


//add TEXT: AUDIO FEATURE
node
  .append('text')
  .attr('dy', '60')
  .attr('dx', '110')

  .style('text-anchor', 'middle')
  .text(function(d) {
    return d.data.Name
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', 18)
  .attr('fill', 'black')
// Add more visible text to show the data count in each node

//add TEXT: PERCENTAGE OF AUDIO FEATURE
const dur2  = dur/6
node
  .append('text')
  .attr('dy', '80')
  .attr('dx', '110')
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
  .attr('font-size', 18)
  .attr('fill', 'black')


// Set the overall height of the frame around the chart
// d3.select(self.frameElement).style('height', diameter + 'px')

  }
  render(){
    if (this.props.features.data === undefined) {
      return [];
    }
    return(
      <svg ref={node => this.node = node}
      width={0} height={0}></svg>
    )
  }
}

const mapStateToProps = (state) => ({
  features: state.audioFeatures.features
})

const mapDispatchToProps = (dispatch) => ({
  gotAllFeatures: () => dispatch(gotAllFeatures())
})

export default connect(mapStateToProps, mapDispatchToProps)(Triangle)
