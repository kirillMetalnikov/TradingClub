import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Form, Button, Header, Container, Divider, Message, Segment } from 'semantic-ui-react'

import history from '../history'
import {signUp, clearMessage} from '../actions'

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
    this.props.signUp(name, email, password)
  }

  componentWillUnmount() {
    this.setState({input: {name: '', email: '', password: ''}})
    this.props.clearMessage()
  }

  render() {
    var {signUpForm} = this.props

    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Header as='h1'>Sign Up</Header>
          </Segment>
          <Segment>
            <Form
              onSubmit = {this.hundleSubmit}
              error = {signUpForm && signUpForm.type == 'error'}
            >
              <Message
                error
                header={signUpForm ? signUpForm.header: ''}
                content={signUpForm ? signUpForm.text: ''}
              />
              <Form.Field>
                <label>Name</label>
                <input type = 'text' onChange = {this.hundleChange('name')} value = {this.state.input.name} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input type = 'text' onChange = {this.hundleChange('email')} value = {this.state.input.email} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type = 'password' onChange = {this.hundleChange('password')} value = {this.state.input.password} />
              </Form.Field>
              <Button.Group>
                <Button onClick = {() => {history.push('/login')}}>Login</Button>
                <Button.Or />
                <Button type='submit' color = 'violet'>SignUp</Button>
              </Button.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({messages}) => {
  var {signUpForm} = messages
  return {signUpForm}
}
export default connect(mapStateToProps, {signUp, clearMessage})(SignUp)
