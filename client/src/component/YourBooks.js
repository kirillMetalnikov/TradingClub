import React, {Component} from 'react'
import {connect} from 'react-redux'

class YourBooks extends Component {
  render() {
    return (
      <h1>YourBooks</h1>
    )
  }
}

export default connect()(YourBooks)
