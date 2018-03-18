import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Form, Button, Header, Container, Divider, Message } from 'semantic-ui-react'

import {changeProfile, changePassword, clearMessage} from '../actions'

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

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    var {name, location, oldPassword, newPassword} = this.state.input
    var placeholderName = this.props.user ? this.props.user.name : ''
    var placeholderLocation = this.props.user ? this.props.user.location : ''
    var {changePasswordForm} = this.props
    var {changeProfileForm} = this.props

    return (
      <Container>
        <Header as='h3'>Change profile</Header>
        <Form
          onSubmit = {this.hundleChangeProfile}
          success = {changeProfileForm && changeProfileForm.type == 'success'}
        >
          <Message
            success
            header={changeProfileForm ? changeProfileForm.header: ''}
            content={changeProfileForm ? changeProfileForm.text: ''}
          />
          <Form.Field>
            <label>Name</label>
            <input type = 'text' onChange = {this.hundleChangeInput('name')} value = {name} placeholder = {placeholderName} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input type = 'text' onChange = {this.hundleChangeInput('location')} value = {location}  placeholder = {placeholderLocation} />
          </Form.Field>
          <Button type='submit' color = 'violet'>Save</Button>
        </Form>
        <Divider section />
        <Header as='h3'>Change password</Header>
        <Form
          onSubmit = {this.hundleChangePassword}
          error = {changePasswordForm && changePasswordForm.type == 'error'}
          success = {changePasswordForm && changePasswordForm.type == 'success'}
        >
          <Message
            error
            header={changePasswordForm ? changePasswordForm.header: ''}
            content={changePasswordForm ? changePasswordForm.text: ''}
          />
          <Message
            success
            header={changePasswordForm ? changePasswordForm.header: ''}
            content={changePasswordForm ? changePasswordForm.text: ''}
          />
          <Form.Field>
            <label>Old password</label>
            <input type = 'password' onChange = {this.hundleChangeInput('oldPassword')} value = {oldPassword} />
          </Form.Field>
          <Form.Field>
            <label>New password</label>
            <input type = 'password' onChange = {this.hundleChangeInput('newPassword')} value = {newPassword} />
          </Form.Field>
          <Button type='submit' color = 'violet'>Save</Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = ({user, messages}) => {
  var {changePasswordForm, changeProfileForm} = messages
  return {user, changePasswordForm, changeProfileForm}
}
export default connect(mapStateToProps, {changeProfile, changePassword, clearMessage})(Profile)
