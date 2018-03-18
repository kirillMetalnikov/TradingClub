import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Image, Button, Container} from 'semantic-ui-react'

import {addBook, getYourBooks, deleteBook} from '../actions'
import TradePanel from './TradePanel'

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
      thumbnail = thumbnail.replace('zoom=1', 'zoom=2')
      return (
        <Card key = {_id}>
          <Image src = {thumbnail} />
          <Card.Content>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>{title}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button color = 'violet' onClick = {this.hundleDelete(_id)}>Delete</Button>
          </Card.Content>
        </Card>
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
      <Container>
        <h1>YourBooks</h1>
        <TradePanel />
        <form onSubmit = {this.hundleSubmit.bind(this)}>
          <input onChange = {this.hundleChange.bind(this)} placeholder = 'enter name book' value = {this.state.inputValue}/>
          <button type = 'submit'>Add</button>
        </form>
        <Card.Group>
          {this.renderList()}
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({yourBooks}) => {
  return {yourBooks}
}
export default connect(mapStateToProps, {addBook, getYourBooks, deleteBook})(YourBooks)
