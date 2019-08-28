import React from 'react'
import {connect} from 'react-redux'
import {gotAllFeatures, gotArtistsFreq, gotAllLyrics, gotAllGenres} from '../store'

class ViewData extends React.Component{
  async componentDidMount(){
    try {
      await this.props.gotAllFeatures()
      await this.props.gotAllGenres()
      await this.props.gotAllLyrics()
      await this.props.gotArtistsFreq()

    } catch (error) {
      console.log('error in the viewData componenet', error)
    }


  }

  render(){
    let {frequency, genres, features} = this.props
    if (frequency === undefined){
      return []
    }
    console.log('genres: ', genres)
    console.log('features: ', features)
    return(
      <div>
        <h4>These are the artists saved in your tracks and albums which we used to create your bar chart: </h4>
        <ul>{frequency.map(artist =>{
          return(
            <li>{artist.name}</li>
          )
        })}</ul>

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
