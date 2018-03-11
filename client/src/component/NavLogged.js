import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'

class NavLogged extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <IndexLinkContainer to='/'>
            <NavItem>
            Home
            </NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/allbooks'>
            <NavItem>
             All books
            </NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/yourbooks' location={this.props.location}>
            <NavItem>
             Your books
            </NavItem>
          </IndexLinkContainer>
        </Nav>
        <Nav pullRight>
          <Navbar.Text>
            Hellow, {this.props.user.name}
          </Navbar.Text>
          <IndexLinkContainer to='/profile'>
            <NavItem location={this.props.location}>
             Profile
            </NavItem>
          </IndexLinkContainer>
          <NavItem href="/auth/logout">
            Logout
          </NavItem>
        </Nav>
    </Navbar>
    )
  }
}


function mapStateToProps({user}) {
  return {user}
}
// without {pure: false} an active link don't work (and need to Parent component!!!)
export default connect(mapStateToProps, null, null, {pure: false})(NavLogged)
