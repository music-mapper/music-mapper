// import React from 'react'
// import {gotAllTracks} from '../store/songs'
// import {connect} from 'react-redux'

// class ThirdGraph extends React.Component{

//   componentDidMount(){
//     this.props.gotAllTracks()
//   }

// render(){
//   console.log(this.props)
//   let {defaultTracks, loading} = this.props
//   if (loading) return <div>Loading...</div>
//   if (defaultTracks === undefined){
//     defaultTracks = []
//   }
//   return(
//     <div>
//       {
//         defaultTracks.map(track =>{
//           return (
//             <div>{track.track}</div>,
//             <div>{track.track.name}</div>
//           )
//         })
//       }
//     </div>
//   )
// }
// }

// const mapStateToProps = (state) => ({
//   loading: state.loading,
//   defaultTracks: state.songsReducer.defaultTracks
// })

// const mapDispatchToProps = (dispatch) => ({
// gotAllTracks: () =>dispatch(gotAllTracks)
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ThirdGraph)

