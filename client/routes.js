import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Login} from './components'
import ReactBubbleChart from './components/react-bubble-chart'
import GenreMap from './components/GenreMap'
import Triangle from './components/triangle';
import BarChart from './components/barChart';
import AllGraphsPage from './components/allGraphPage'
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
        <Route path="/artists" component={BarChart} />

        <Route path="/genres" component={GenreMap} />
        <Route path="/features" component={Triangle} />
        {/* Displays our Login component as a fallback */}
        <Route path="/features" component={Triangle} />
        <Route path= '/app' component={AllGraphsPage}/>

        <Route component={Login} />
      </Switch>
    )
  }
}

export default Routes
