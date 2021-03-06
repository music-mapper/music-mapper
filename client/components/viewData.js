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
    return (
      <div id ='view-data'>
        <h1 id='heading-one'> Here is the data used to construct your graphs:</h1>

        <h2 id='heading-two'> Lyrics Chart: </h2>
        <ul>
          <h3>
          <li>The first 20 saved songs from your Spotify library </li>
          <li>The first 30% of the lyrics from those 20 songs </li>
          </h3>
        </ul>

        <h2 id='heading-three'> Features Chart: </h2>
        <ul>
         < h3>
          <li>The first 20 saved songs from your Spotify library </li>
          </h3>
        </ul>

        <h2 id= 'heading-four'> Genres Chart: </h2>
        <ul>
          <h3>
          <li>The first 20 saved albums from your Spotify library </li>
          </h3>
        </ul>


        <h2 id='heading-five'> Artists Chart: </h2>
        <ul>
          <h3>
          <li>The first 20 saved songs and first 20 albums from your Spotify library </li>
          </h3>
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
