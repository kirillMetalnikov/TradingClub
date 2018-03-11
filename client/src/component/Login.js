import React, {Component} from 'react'
import {connect} from 'react-redux'

import {login} from '../actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {input: {email: '', password: ''}}
    this.hundleChange = this.hundleChange.bind(this)
    this.hundleSubmit = this.hundleSubmit.bind(this)
  }

  hundleChange(inputName) {
    return (e) => {
      var {input} = this.state
      input[inputName] = e.target.value
      this.setState({input})
    }
  }

  hundleSubmit(e) {
    e.preventDefault()
    var {email, password} = this.state.input
    var input = {email: '', password: ''}
    this.setState({input})
    this.props.login(email, password)
  }

  render() {
    var {email, password} = this.state.input
    return (
      <form  onSubmit = {this.hundleSubmit}>
        <input type = 'text' label = 'email' onChange = {this.hundleChange('email')} value = {email}></input>
        <input type = 'password' name ='password' onChange = {this.hundleChange('password')} value = {password}></input>
        <button type='submit'>login</button>
      </form>
    )
  }
}

export default connect(null, {login})(Login)
