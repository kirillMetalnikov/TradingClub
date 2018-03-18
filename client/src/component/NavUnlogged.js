import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Container} from 'semantic-ui-react'

import history from '../history'

class NavUnlogged extends Component {
  constructor(props) {
    super(props)
    var location = history.location.pathname.substring(1)
    this.state = { activeItem: location }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
    name == 'home' ? history.push('/') : history.push('/' + name)
  }

  render() {
    var { activeItem } = this.state

    return (
      <Menu size='large' pointing secondary color='violet' inverted>
        <Container>
          <Menu.Item name='home' active={activeItem === 'home' || activeItem == ''} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='signUp' active={activeItem === 'signUp'} onClick={this.handleItemClick} />
            <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}


function mapStateToProps({user}) {
  return {user}
}

// without {pure: false} an active link don't work (and need to Parent component!!!)
export default connect(mapStateToProps, null, null, {pure: false})(NavUnlogged)
