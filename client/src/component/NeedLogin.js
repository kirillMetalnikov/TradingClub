import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'

import history from '../history'

class NeedLogin extends Component {
  renderNeedLogin() {
    return (
      <Container>
        <h1  className='login-link'>
          To see this page you need{' '}
          <span
            onClick = {() => history.push('/login')}
          >
            login
          </span>
        </h1>
      </Container>
    )
  }

  render() {
    var {user} = this.props

    return user ? this.props.children : this.renderNeedLogin()
  }
}

function mapStateToProps({user}) {
  return {user}
}

export default connect(mapStateToProps)(NeedLogin)
