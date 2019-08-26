import React from 'react'
import BarGraph from './firstBarChart'

export default class ReactBarChart extends React.Component{
  render(){
    return(
      <div>
        <BarGraph size={[1000,1000]}/>
      </div>
    )
  }
}
