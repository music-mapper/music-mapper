import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {gotArtistsFreq} from '../store'

class TreeChart extends React.Component {
  async componentDidMount() {
    try{
    await this.props.gotArtistsFreq()
    this.createTreeChart()
  } catch (error) {
    console.log('error in component did mount', error)
}
  }

  createTreeChart() {
    const color = d3.scaleOrdinal(d3.schemeSet2)
    const data = this.props.frequency
    data.sort(function(b, a) {
      return a.value - b.value
    })

    const margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



// X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.name; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .attr('fill', function(d, i) {
      return color(i)
    });

//get max val
let vals = []
for (let i = 0; i < this.props.frequency.length; i++) {
  vals.push(this.props.frequency[i].value)
}
const max = Math.max(...vals)
// Add Y axis
const y = d3.scaleLinear()
  .domain([0, max])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })
    .attr('fill', function(d, i) {
      return color(i)
    })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.value); })
  .attr("height", function(d) { return height - y(d.value); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

  }
  render() {
    return <div id="my_dataviz"> </div>
  }
}

const mapStateToProps = state => ({
  frequency: state.artists.frequency
})

const mapDispatchToProps = dispatch => ({
  gotArtistsFreq: () => dispatch(gotArtistsFreq())
})

export default connect(mapStateToProps, mapDispatchToProps)(TreeChart)