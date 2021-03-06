import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom'
import {connect} from 'react-redux'
//import {Grid, Row} from 'react-bootstrap'

import history from '../history'
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
        <Router history= {history}>
          <div>
            <Header />
            <Switch>
              <Route exact path ='/' component={Home} />
              <Route exact path ='/all books' component={AllBooks} />
              <Route exact path='/your books' component={YourBooks} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/profile' component={Profile} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
    )
  }
}

export default connect(null, {getCurrentUser})(App)
