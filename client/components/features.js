import React from 'react'
import * as d3 from 'd3'
import { loadLiquidFillGauge } from './liquid'
import { liquidFillGaugeDefaultSettings } from './liquid'

export default class Features extends React.Component {

  componentDidMount() {
    this.createFeauturesGraph()
    this.createFeauturesGraph = this.createBubbleGraph.bind(this)

  }
  createFeauturesGraph(){
    var svg = d3
    .select('body')
    .append('svg')
    .attr('id', 'fillgauge1')


  var node = loadLiquidFillGauge("fillgauge1", 55);
  // var config1 = liquidFillGaugeDefaultSettings();
    // config1.circleColor = "#FF7777";
    // config1.textColor = "#FF4444";
    // config1.waveTextColor = "#FFAAAA";
    // config1.waveColor = "#FFDDDD";
    // config1.circleThickness = 0.2;
    // config1.textVertPosition = 0.2;
    // config1.waveAnimateTime = 1000;

  }
  render(){
    return(
      <svg id="fillgauge1" width="97%" height="250" ref={node => this.node = node}>hi</svg>
    )
  }
}
