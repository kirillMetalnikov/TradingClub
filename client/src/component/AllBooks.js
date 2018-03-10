import React, {Component} from 'react'
import {connect} from 'react-redux'

class AllBooks extends Component {
  render() {
    return (
      <h1>AllBooks</h1>
    )
  }
}

export default connect()(AllBooks)
