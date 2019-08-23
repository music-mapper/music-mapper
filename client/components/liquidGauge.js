import React from 'react'
import * as d3 from 'd3'
import {liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from './gaugefunctions'


<svg id="fillgauge1" width="97%" height="250" onclick="gauge1.update(NewValue());"></svg>

export default class Gauge extends React.Component{
  constructor(){
    super()
    this.createGaugeChart = this.createGaugeChart.bind(this)
  }
createGaugeChart(){
var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
var config1 = liquidFillGaugeDefaultSettings();
config1.circleColor = "#FF7777";
config1.textColor = "#FF4444";
config1.waveTextColor = "#FFAAAA";
config1.waveColor = "#FFDDDD";
config1.circleThickness = 0.2;
config1.textVertPosition = 0.2;
config1.waveAnimateTime = 1000;
function NewValue(){
    if(Math.random() > .5){
        return Math.round(Math.random()*100);
    } else {
        return (Math.random()*100).toFixed(1);
    }
}
}
