import React from 'react';
import WordCloud from 'react-d3-cloud';
import {gotAllGenres} from '../store/genres';
import {connect} from 'react-redux'

const fontSizeMapper =  word => Math.log2(word.value) * 15;
const rotate = word => word.value % 360;

class GenreMap extends React.Component{
  async componentDidMount(){
    try {
      await this.props.gotAllGenres()
    } catch (error) {
      console.log('error in genres component did mount', error)
    }
  }
render(){
  if (this.props.genres.data === undefined){
    return []
  }
  if (this.props.genres.data.value === 1){
    this.props.genres.data.value *= 10
  }

  return(<WordCloud
    data={this.props.genres.data}
    fontSizeMapper={fontSizeMapper}
    rotate={rotate}
  />)
}}

const mapStatetoProps = (state) => ({
  genres: state.genres.genres
})

const mapDispatchToProps = (dispatch) => ({
  gotAllGenres: () => dispatch(gotAllGenres())
})

export default connect(mapStatetoProps, mapDispatchToProps)(GenreMap)
