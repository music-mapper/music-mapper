import React from 'react'
import BarGraph from './barChart'

export default class ReactBubbleChart extends React.Component{
  render(){
    return(
      <div>
        <BarGraph size={[1000,1000]}/>
      </div>
    )
  }
}
