import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getAllBooks} from '../actions'

class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.renderList = this.renderList.bind(this)
  }
  
  componentWillMount() {
    this.props.getAllBooks()
  }
  
  renderList(){
    var {allBooks} = this.props
    return allBooks.map( book => {
      var {title, thumbnail, _id} = book
      return (
        <div className = 'book' key = {_id}>
          <h5>{title}</h5>
          <img src = {thumbnail} />
        </div>
      )
    })
  }
  
  render() {
    return (
      <div>
        <h1>AllBooks</h1>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({allBooks}) => {
  return {allBooks}
}
export default connect(mapStateToProps, {getAllBooks})(AllBooks)
