import React, {Component} from 'react'
import {connect} from 'react-redux'

import {yourReq, forYourReq, cancelTrade, aproveTrade} from '../actions'

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
      this.props.yourReq()
      this.props.forYourReq()
      this.setState({active})
    }
  }

  renderYours(aproved, notAproved) {
    return (
      <div>
        {notAproved.map( book => {
          return (
            <div key = {book._id}>
              {book.title}
              <button onClick ={this.hundleCancel(book._id)}>Cancel</button>
            </div>
          )
        })}
        {aproved.length > 0 ? <h3>Approved:</h3> : null}
        {aproved.map( book => {
          return (
            <div key = {book._id}>
              {book.title}
              <button onClick ={this.hundleCancel(book._id)}>Cancel</button>
            </div>
          )
        })}
      </div>
    )
  }
  hundleAprove(_id) {
    return () => {
      this.props.aproveTrade(_id)
    }
  }

  hundleCancel(_id) {
    return () => {
      this.props.cancelTrade(_id)
    }
  }

  renderForYou(aproved, notAproved) {
    return (
      <div>
        {notAproved.map( book => {
          return (
            <div key = {book._id}>
              {book.title}
              <button onClick ={this.hundleCancel(book._id)}>Cancel</button>
              <button onClick ={this.hundleAprove(book._id)}>Aprove</button>
            </div>
          )
        })}
        {aproved.length > 0 ? <h3>Approved:</h3> : null}
        {aproved.map( book => {
          return (
            <div key = {book._id}>
              {book.title}
              <button onClick ={this.hundleCancel(book._id)}>Cancel</button>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    var {active} = this.state
    var {yourRequests, forYourRequests} = this.props
    var yourNotAproved = yourRequests.filter( book => {
      return !book.trade.aproved
    })
    var yourAproved = yourRequests.filter( book => {
      return book.trade.aproved
    })
    var forYourNotAproved = forYourRequests.filter( book => {
      return !book.trade.aproved
    })
    var forYourAproved = forYourRequests.filter( book => {
      return book.trade.aproved
    })
    return (
      <div>
        <button onClick = {this.setActive('yours')}>Your trade requests: {yourNotAproved.length}/{yourRequests.length}</button>
        <button onClick = {this.setActive('forYou')}>Trade requests for you: {forYourNotAproved.length}/{forYourRequests.length}</button>
        {active
          ? active == 'yours'
            ? this.renderYours(yourAproved, yourNotAproved)
            : this.renderForYou(forYourAproved, forYourNotAproved)
          : null}
      </div>
    )
  }
}

function mapStateToProps({yourRequests, forYourRequests}) {
  return {yourRequests, forYourRequests}
}

export default connect(mapStateToProps, {yourReq, forYourReq, cancelTrade, aproveTrade})(TradePanel)
