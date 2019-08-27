import React from 'react'
import {connect} from 'react-redux'
import {gotAllFeatures, gotArtistsFreq, gotAllLyrics, gotAllGenres} from './store'

class ViewData extends React.Component{
  componentDidMount(){

  }

  render(){
    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
frequency: state.artists.frequency,
lyrics: state.songs.lyrics,
genres: state.genres.genres,
features: state.audioFeatures.features
})

const mapDispatchToProps = dispatch => ({
  gotArtistsFreq: () => dispatch(gotArtistsFreq()),
  gotAllLyrics: () => dispatch(gotAllLyrics()),
  gotAllGenres: () => dispatch(gotAllGenres()),
  gotAllFeatures: () => dispatch(gotAllFeatures())
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewData)
