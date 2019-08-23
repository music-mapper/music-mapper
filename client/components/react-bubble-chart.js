import React from 'react'
import BubbleChart from './bubble-chart'
import StreamGraph from './streamGraph';

export default class ReactBubbleChart extends React.Component{
  render(){
    return(
      <div>
        <BubbleChart size={[1000,1000]} />
        {/* <StreamGraph /> */}
      </div>
    )
  }
}
