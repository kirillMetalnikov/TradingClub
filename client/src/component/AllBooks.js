import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getAllBooks, trade} from '../actions'
import TradePanel from './TradePanel'

class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.renderList = this.renderList.bind(this)
  }

  componentWillMount() {
    this.props.getAllBooks()
  }

  hundleTrade(_id) {
    return () => {
      this.props.trade(_id)
    }
  }

  renderList(){
    var {allBooks} = this.props
    var userID = this.props.user && this.props.user._id
    return allBooks.map( book => {
      var {title, thumbnail, _id, owner} = book
      return (
        <div className = 'book' key = {_id}>
          <h5>{title}</h5>
          <img src = {thumbnail} />
          {userID != owner ? <button onClick={this.hundleTrade(_id)}>trade</button> : null}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>AllBooks</h1>
        <TradePanel />
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({allBooks, user}) => {
  return {allBooks, user}
}
export default connect(mapStateToProps, {getAllBooks, trade})(AllBooks)
