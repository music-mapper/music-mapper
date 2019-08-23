import React from 'react'
import BubbleChart from './bubble-chart'
import StreamGraph from './streamGraph';
import BarGraph from './firstBarChart'

export default class ReactBubbleChart extends React.Component{
  render(){
    return(
      <div>
        <BubbleChart size={[500,500]} />
        <StreamGraph />
        <BarGraph />
      </div>
    )
  }
}
