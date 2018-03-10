import React, {Component} from 'react'
import {connect} from 'react-redux'

class Profile extends Component {
  render() {
    return (
      <h1>Profile</h1>
    )
  }
}

export default connect()(Profile)
