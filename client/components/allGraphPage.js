import React from 'react'
import CollisionChart from './collisionChart'
import BarChart from './barChart'
import Triangle from './triangle'
import GenreMap from './GenreMap'
import * as d3 from 'd3'


export default class ReactBubbleChart extends React.Component {
  constructor() {
    super()
    this.state = {currentChart: 'CollisionChart'}
  }
  render() {
    console.log(this.state)
    d3.selectAll('svg > *').remove();
    return (
      <div className="app">
        <div className="app-container">
          {/* <BubbleChart size={[1000, 1000]} /> */}
          <div className="app-navigation">


            <a onClick={() => this.setState({currentChart: 'CollisionChart'})}className="navigation-link">
              <span className="nav-icon">
                <i className="fa fa-file-text-o" aria-hidden="true" />
              </span>
              <span className="nav-label">Lyrics</span>
            </a>

            <a
              onClick={() => this.setState({currentChart: 'Triangle'})}
              className="navigation-link"
            >
              <span className="nav-icon">
                <i class="fa fa-headphones" aria-hidden="true" />
              </span>
              <span className="nav-label">Features</span>
            </a>

            <a
              onClick={() => this.setState({currentChart: 'GenreMap'})}
              className="navigation-link"
            >
              <span className="nav-icon">
                <i className="fa fa-music" aria-hidden="true" />
              </span>
              <span className="nav-label">Genres</span>
            </a>

            <a
              onClick={() => this.setState({currentChart: 'BarChart'})}
              className="navigation-link"
            >
              <span className="nav-icon">
                <i className="fa fa-star" aria-hidden="true" />
              </span>
              <span className="nav-label">Artists</span>
            </a>
          </div>

          <div className="app-content">
            {this.state.currentChart === 'BarChart' && <BarChart />}

            {this.state.currentChart === 'GenreMap' && <GenreMap />}

            {this.state.currentChart === 'Triangle' && <Triangle />}

            {this.state.currentChart === 'CollisionChart' && <CollisionChart />}
          </div>
        </div>
      </div>
    )
  }
}
