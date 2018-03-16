import React, {Component} from 'react'
import {connect} from 'react-redux'

import {changeProfile, changePassword} from '../actions'

class Profile extends Component {
  constructor(props) {
    super(props)
  //  var {name, location, oldPassword, newPassword} = this.props.user
    this.state = {input: {name: '', location: '', oldPassword: '', newPassword: ''}}
    this.hundleChangeInput = this.hundleChangeInput.bind(this)
    this.hundleChangeProfile = this.hundleChangeProfile.bind(this)
    this.hundleChangePassword = this.hundleChangePassword.bind(this)
  }

  hundleChangeInput(inputName) {
    return (e) => {
      var {input} = this.state
      input[inputName] = e.target.value
      this.setState({input})
    }
  }

  hundleChangeProfile(e) {
    e.preventDefault()
    var {name, location} = this.state.input
    if(!name) name = this.props.user ? this.props.user.name : ''
    if(!location) location = this.props.user ? this.props.user.location : ''
    
    this.setState({input: {name: '', location: ''}})
    this.props.changeProfile(name, location)
  }

  hundleChangePassword(e) {
    e.preventDefault()
    var {oldPassword, newPassword} = this.state.input
    this.setState({input: {oldPassword: '', newPassword: ''}})
    this.props.changePassword(oldPassword, newPassword)
  }

  render() {
    var {name, location, oldPassword, newPassword} = this.state.input
    var placeholderName = this.props.user ? this.props.user.name : ''
    var placeholderLocation = this.props.user ? this.props.user.location : ''
    return (
      <div>
        <h3>Change profile</h3>
        <form  onSubmit = {this.hundleChangeProfile}>
          <input type = 'text' label = 'name' onChange = {this.hundleChangeInput('name')} value = {name} placeholder = {placeholderName}></input>
          <input type = 'text' label = 'location' onChange = {this.hundleChangeInput('location')} value = {location}  placeholder = {placeholderLocation}></input>
          <button type='submit'>Save</button>
        </form>
        <h3>Change password</h3>
        <form  onSubmit = {this.hundleChangePassword}>
          <input type = 'password' label = 'oldPassword' onChange = {this.hundleChangeInput('oldPassword')} value = {oldPassword}></input>
          <input type = 'password' label = 'newPassword' onChange = {this.hundleChangeInput('newPassword')} value = {newPassword}></input>
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
}
export default connect(mapStateToProps, {changeProfile, changePassword})(Profile)
