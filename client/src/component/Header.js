import React, {Component} from 'react'
import {connect} from 'react-redux'
import NavLogged from './NavLogged'
import NavUnlogged from './NavUnlogged'

class Header extends Component {
  render() {
    var {user} = this.props

    return user ? <NavLogged /> : <NavUnlogged />
  }
}




function mapStateToProps({user}) {
  return {user}
}

// without {pure: false} an active link don't work (and need to Child component!!!)
// https://stackoverflow.com/questions/38269997/react-router-link-component-doesnt-get-activestyle-applied-after-connecting
export default connect(mapStateToProps, null, null, {pure: false})(Header)
