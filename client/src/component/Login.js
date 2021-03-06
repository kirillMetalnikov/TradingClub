import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Form, Button, Header, Container, Divider, Message, Segment } from 'semantic-ui-react'

import history from '../history'
import {login, clearMessage} from '../actions'

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

  componentWillUnmount() {
    this.props.clearMessage()
  }

  render() {
    var {email, password} = this.state.input
    var {loginForm} = this.props
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Header as='h1'>Login</Header>
          </Segment>
          <Segment>
            <Form
              onSubmit = {this.hundleSubmit}
              error = {loginForm && loginForm.type == 'error'}
            >
              <Message
                error
                header={loginForm ? loginForm.header: ''}
                content={loginForm ? loginForm.text: ''}
              />
              <Form.Field>
                <label>Email</label>
                <input type = 'text' onChange = {this.hundleChange('email')} value = {email} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type = 'password' onChange = {this.hundleChange('password')} value = {password} />
              </Form.Field>
              <Button.Group>
                <Button type='submit' color = 'violet'>Login</Button>
                <Button.Or />
                <Button onClick = {() => {history.push('/signUp')}}>Sign Up</Button>
              </Button.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({messages}) => {
  var {loginForm} = messages
  return {loginForm}
}
export default connect(mapStateToProps, {login, clearMessage})(Login)
