import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Channels from '../Stateful/channels'
import Private from '../Stateful/private'
import Login from '../Stateful/login'
import NoMatch from '../Stateful/noMatch'

const MainRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/channels/:channelName" component={Channels} />
      <Route exact path="/private/:channelName" component={Private} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default MainRoutes
