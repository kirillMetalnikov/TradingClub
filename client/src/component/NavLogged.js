import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Container} from 'semantic-ui-react'

import history from '../history'
import {logout} from '../actions'

class NavLogged extends Component {
  constructor(props) {
    super(props)
    var location = history.location.pathname.substring(1)
    this.state = { activeItem: location }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
    name == 'home'
      ? history.push('/')
      : name == 'logout'
        ? this.props.logout()
        :history.push('/' + name)
  }

  render() {
    var { activeItem } = this.state
    return (
      <Menu size='large' pointing secondary color='violet' inverted>
        <Container>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='allbooks' active={activeItem === 'allbooks'} onClick={this.handleItemClick} />
          <Menu.Item name='yourbooks' active={activeItem === 'yourbooks'} onClick={this.handleItemClick} />

          <Menu.Menu position='right'>
            <Menu.Item header>Hello, {this.props.user.name}</Menu.Item>
            <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} />
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
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
export default connect(mapStateToProps, {logout}, null, {pure: false})(NavLogged)
