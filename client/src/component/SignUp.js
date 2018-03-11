import React, {Component} from 'react'
import {connect} from 'react-redux'

import {signUp} from '../actions'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {input: {name: '', email: '', password: ''}}
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
    var {name, email, password} = this.state.input
    this.setState({input: {name: '', email: '', password: ''}})
    this.props.signUp(name, email, password)
  }

  render() {
    return (
      <form  onSubmit = {this.hundleSubmit}>
        <input type = 'text' label = 'Name' onChange = {this.hundleChange('name')} value = {this.state.name}></input>
        <input type = 'text' label = 'email' onChange = {this.hundleChange('email')} value = {this.state.name}></input>
        <input type = 'password' name ='password' onChange = {this.hundleChange('password')} value = {this.state.name}></input>
        <button type='submit'>SignUp</button>
      </form>
    )
  }
}

export default connect(null, {signUp})(SignUp)
