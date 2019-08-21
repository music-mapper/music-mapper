import React from 'react'
import {gotAllTracks} from '../store/songs'
import {connect} from 'react-redux'

class ThirdGraph extends React.Component{


render(){
  console.log(this.props)
  let defaultTracks = this.props
  if (defaultTracks === undefined){
    defaultTracks = []
  }
  return(
    <div>
      {
        defaultTracks.map(song =>{
          return (
            <div>{song.track}</div>,
            <div>{song.track.name}</div>
          )
        })
      }
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  defaultTracks: state.defaultTracks
})

export default connect(mapStateToProps)(ThirdGraph)

