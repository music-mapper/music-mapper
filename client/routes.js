import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Login} from './components'
import ReactBubbleChart from './components/react-bubble-chart'
import GenreMap from './components/GenreMap'
import BarGraph from './components/firstBarChart'
import Triangle from './components/triangle';

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/lyrics" component={ReactBubbleChart} />
        <Route path="/features" component={BarGraph} />

        <Route path="/genres" component={GenreMap} />
        <Route path="/triangle" component={Triangle} />
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

export default Routes
