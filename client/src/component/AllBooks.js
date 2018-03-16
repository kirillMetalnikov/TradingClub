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
    return allBooks.map( book => {
      var {title, thumbnail, _id} = book
      return (
        <div className = 'book' key = {_id}>
          <h5>{title}</h5>
          <img src = {thumbnail} />
          <button onClick={this.hundleTrade(_id)}>trade</button>
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

const mapStateToProps = ({allBooks}) => {
  return {allBooks}
}
export default connect(mapStateToProps, {getAllBooks, trade})(AllBooks)
