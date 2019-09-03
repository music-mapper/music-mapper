import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Login} from './components'
import GenreMap from './components/genreMap'
import Triangle from './components/triangle'
import BarChart from './components/barChart'
import AllGraphsPage from './components/allGraphPage'
import viewData from './components/viewData'
import ReactCollisionChart from './components/reactCollisionChart'
/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/lyrics" component={ReactCollisionChart} />
        <Route path="/artists" component={BarChart} />
        <Route path="/genres" component={GenreMap} />
        <Route path="/features" component={Triangle} />
        <Route path="/app" component={AllGraphsPage} />
        <Route path="/data" component={viewData} />
        <Route component={Login} />
      </Switch>
    )
  }
}

export default Routes
