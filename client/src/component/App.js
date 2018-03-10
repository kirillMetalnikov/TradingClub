import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, Row} from 'react-bootstrap'

import Header from './Header'
import NavLogged from './NavLogged'
import Home from './Home'
import AllBooks from './AllBooks'
import Profile from './Profile'
import Login from './Login'
import SignUp from './SignUp'
import YourBooks from './YourBooks'
import Page404 from './Page404'

import {getCurrentUser} from '../actions'

class App extends Component {
  
  componentDidMount() {
    this.props.getCurrentUser()
  }
  
  render() {
    return (
      <Grid>
        <BrowserRouter>
          <div>
            <Row>
              <Header />
            </Row>
            <Switch>
              <Route exact path ='/' component={Home} />
              <Route exact path ='/allbooks' component={AllBooks} />
              <Route exact path='/yourbooks' component={YourBooks} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/profile' component={Profile} />
              <Route component={Page404} />
            </Switch>
          </div>
        </BrowserRouter>
      </Grid>
    )
  }
}

export default connect(null, {getCurrentUser})(App)
