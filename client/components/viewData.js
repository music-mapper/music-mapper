import React from 'react'
import { connect } from 'react-redux'
import { gotAllFeatures, gotArtistsFreq, gotAllLyrics, gotAllGenres } from '../store'

class ViewData extends React.Component {
  async componentDidMount() {
    try {
      await this.props.gotAllFeatures()
      await this.props.gotAllGenres()
      await this.props.gotAllLyrics()
      await this.props.gotArtistsFreq()

    } catch (error) {
      console.log('error in the viewData componenet', error)
    }


  }

  render() {
    let { frequency, genres, features } = this.props
    if (frequency === undefined) {
      return []
    }
    console.log('genres: ', genres)
    console.log('features: ', features)
    return (
      <div id ='view-data'>
        <h1> What data are the graphs contructed with?</h1>

        <h3> Lyrics Chart: </h3>
        <ul>
          <li>The first 20 songs from your Spotify library </li>
          <li>The first 30% of the lyrics from those 20 songs </li>
        </ul>

        <h3> Features Chart: </h3>
        <ul>
          <li>The first 20 songs from your Spotify library </li>
        </ul>

        <h3> Genres Chart: </h3>
        <ul>
          <li>The first 20 Albums from your Spotify library </li>
        </ul>


        <h3> Artists Chart: </h3>
        <ul>
          <li>The first 20 songs and first 20 albums from your Spotify library </li>
        </ul>

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
