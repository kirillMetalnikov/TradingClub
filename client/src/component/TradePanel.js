import React, {Component} from 'react'
import {connect} from 'react-redux'

import {yourReq, forYourReq} from '../actions'

class TradePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {active: null}
    this.setActive = this.setActive.bind(this)
  }
  
  componentWillMount() {
    this.props.yourReq()
    this.props.forYourReq()
  }
  
  setActive(active) {
    return () => {
      this.setState({active})
    }
  }

  renderYours() {
    var {yourRequests} = this.props
    return (
      yourRequests.map( book => {
        return <div key = {book._id}>{book.title}</div>
      })
    )
  }

  renderForYou() {
    var {forYourRequests} = this.props
    return (
      forYourRequests.map( book => {
        return <div key = {book._id}>{book.title}</div>
      })
    )
  }

  render() {
    var {active} = this.state
    var {yourRequests, forYourRequests} = this.props
    return (
      <div>
        <button onClick = {this.setActive('yours')}>Your trade requests: {yourRequests.length}</button>
        <button onClick = {this.setActive('forYou')}>Trade requests for you: {forYourRequests.length}</button>
        {active
          ? active == 'yours'
            ? this.renderYours()
            : this.renderForYou()
          : null}
      </div>
    )
  }
}

function mapStateToProps({yourRequests, forYourRequests}) {
  return {yourRequests, forYourRequests}
}

export default connect(mapStateToProps, {yourReq, forYourReq})(TradePanel)
