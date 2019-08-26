import React from 'react'
import CollisionChart from './collisionChart'


export default class ReactBubbleChart extends React.Component{
  render(){
    return <div>
        <CollisionChart size={[1000, 1000]} />
      </div>
  }
}
