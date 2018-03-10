import React, {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
  render() {
    return (
      <form method='post' action='/auth/login'>
        <input type = 'text' name='username'></input>
        <input type = 'password' name ='password'></input>
        <button type='submit'>Login</button>
      </form>
    )
  }
}

export default connect()(Login)
