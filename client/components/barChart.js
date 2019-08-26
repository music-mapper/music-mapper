import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {gotArtistsFreq} from '../store'

class TreeChart extends React.Component {
  async componentDidMount() {
    await this.props.gotArtistsFreq()
    this.createTreeChart()
  }

  createTreeChart() {
    const data = this.props.frequency

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top

    // append the svg object to the body of the page
    var svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Parse the Data
    const color = d3.scaleOrdinal(d3.schemeSet2)

    // sort data.. maybe looks cooler not sorted?
    data.sort(function(b, a) {
      return a.value - b.value
    })

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function(d) {
          return d.name
        })
      )
      .padding(0.2)
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .attr('fill', function(d, i) {
        return color(i)
      })
      .attr("font-size", 15)

    //get max val
    let vals = []
    for (let i = 0; i < this.props.frequency.length; i++) {
      vals.push(this.props.frequency[i].value)
    }
    const max = Math.max(...vals)

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, max])
      .range([height, max])
    svg.append('g').call(d3.axisLeft(y))


    // Bars - not sure why values aren't changing color?
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x(d.name)
      })
      .attr('y', function(d) {
        return y(d.value)
      })
      .attr('width', x.bandwidth())
      .attr('height', function(d) {
        return height - y(d.value)
      })
      .attr('fill', function(d, i) {
        return color(i)
      })
      .attr('font-size', 20)
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
