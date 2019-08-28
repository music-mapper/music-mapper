import React from 'react'
import CollisionChart from './collisionChart'
import BarChart from './barChart'
import Triangle from './triangle'
import GenreMap from './GenreMap'
import ViewData from './viewData'
import * as d3 from 'd3'


export default class AllGraphPage extends React.Component {
  constructor() {
    super()
    this.state = { currentChart: 'CollisionChart' }
  }

  async logout() {
    const url = 'https://www.spotify.com/logout/'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    await setTimeout(() => spotifyLogoutWindow.close(), 2000)
    window.location.replace("http://localhost:8888");
  }

  render() {
    console.log(this.state)

    //everytime the state changes, it removed the old graph so we can load the new one.  'svg' is inside the components
    d3.selectAll('svg > *').remove()

    return (<div className="app">
      <div className="app-container">
        <div className="app-navigation">
          {/* anchor buttons inside navigation bar */}

            <span className='logo-container'>
              <img className='logo' src='https://morganfeir.s3.us-east-2.amazonaws.com/images/music-mapper-logo.png'/>
            </span>

          <a onClick={() => this.setState({ currentChart: 'CollisionChart' })} className="navigation-link">
            <span className="nav-icon">
              <i className="fa fa-file-text-o" aria-hidden="true" />
            </span>
            <span className="nav-label">Lyrics</span>
          </a>

          <a onClick={() => this.setState({ currentChart: 'Triangle' })} className="navigation-link">
            <span className="nav-icon">
              <i className="fa fa-headphones" aria-hidden="true" />
            </span>
            <span className="nav-label">Features</span>
          </a>

          <a onClick={() => this.setState({ currentChart: 'GenreMap' })} className="navigation-link">
            <span className="nav-icon">
              <i className="fa fa-music" aria-hidden="true" />
            </span>
            <span className="nav-label">Genres</span>
          </a>



          <a onClick={() => this.setState({
            currentChart: 'BarChart'
          })} className="navigation-link">
            <span className="nav-icon">
              <i className="fa fa-star" aria-hidden="true" />
            </span>
            <span className="nav-label">Artists</span>
          </a>


          <a onClick={() => this.setState({
            currentChart: 'ViewData'
          })} className="navigation-link">
            <span className="nav-icon">
              <i class="fa fa-info" aria-hidden="true"></i>
            </span>
            <span className="nav-label">My Data</span>
          </a>


          <a onClick={() => this.logout()} className="navigation-link">
            <span className="nav-icon">
              <i class="fa fa-sign-in" aria-hidden="true"></i>
            </span>
            <span className="nav-label">Logout</span>
          </a>

        </div>

        <div className="app-content">

          {/* only renders graph when state is equal to 'GenreMap' */}

          {this.state.currentChart === 'GenreMap' && <GenreMap />}

          {this.state.currentChart === 'Triangle' && <Triangle />}

          {this.state.currentChart === 'BarChart' && <BarChart />}

          {this.state.currentChart === 'CollisionChart' && <CollisionChart />}

          {this.state.currentChart === 'ViewData' && <ViewData />}

        </div>
      </div>
    </div>
    )
  }
}
