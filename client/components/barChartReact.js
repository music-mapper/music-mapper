import React from 'react'
import BarChart from './treeChart'


export default class ReactBarChart extends React.Component{
  render(){
    return(
      <div>
        <BarChart size={[1000,1000]} />
      </div>
    )
  }
}
