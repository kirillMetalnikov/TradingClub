import React, {Component} from 'react'
import {connect} from 'react-redux'

import {addBook, getYourBooks, deleteBook} from '../actions'

class YourBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {inputValue: ''}
    this.renderList = this.renderList.bind(this)
    this.hundleDelete = this.hundleDelete.bind(this)
  }
  
  componentWillMount() {
    this.props.getYourBooks()
  }
  
  renderList(){
    var {yourBooks} = this.props
    return yourBooks.map( book => {
      var {title, thumbnail, _id} = book
      return (
        <div className = 'book'  key = {_id}>
          <h5>{title}</h5>
          <img src = {thumbnail} />
          <button onClick = {this.hundleDelete(_id)}> Delete</button>
        </div>
      )
    })
  }
  
  hundleSubmit(e) {
      e.preventDefault()
      this.props.addBook(this.state.inputValue)
      this.setState({inputValue: ''})
  }
  
  hundleChange(e) {
    var inputValue = e.target.value
    this.setState({inputValue})
  }
  
  hundleDelete(id) {
    return () => {
      this.props.deleteBook(id)
    }
  }
  
  render() {
    return (
      <div>
        <h1>YourBooks</h1>
        <form onSubmit = {this.hundleSubmit.bind(this)}>
          <input onChange = {this.hundleChange.bind(this)} placeholder = 'enter name book' value = {this.state.inputValue}/>
          <button type = 'submit'>Add</button>
        </form>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({yourBooks}) => {
  return {yourBooks}
}
export default connect(mapStateToProps, {addBook, getYourBooks, deleteBook})(YourBooks)
