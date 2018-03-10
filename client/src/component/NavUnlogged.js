import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'

class NavUnlogged extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <IndexLinkContainer to='/'>
            <NavItem>
            Home
            </NavItem>
          </IndexLinkContainer>
        </Nav>
        <Nav pullRight>
          <IndexLinkContainer to='/signup'>
            <NavItem>
              SignUp
            </NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to='/login'>
            <NavItem>
              Login
            </NavItem>
          </IndexLinkContainer>
        </Nav>
    </Navbar>
    )
  }
}


function mapStateToProps({user}) {
  return {user}
}

// without {pure: false} an active link don't work (and need to Parent component!!!)
export default connect(mapStateToProps, null, null, {pure: false})(NavUnlogged)
