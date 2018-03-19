import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Image, Button, Container, Divider, Input, Segment} from 'semantic-ui-react'

import {addBook, getYourBooks, deleteBook} from '../actions'
import TradePanel from './TradePanel'
import NeedLogin from './NeedLogin'

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
    var {yourBooks} = this.props
    return (
      <NeedLogin>
        <Container>
          <Segment.Group>
            <Segment><TradePanel /></Segment>
            <Segment  textAlign='right'>
              <form onSubmit = {this.hundleSubmit.bind(this)}>
                <Input type='text'  placeholder = 'enter name book' action>
                  <input onChange = {this.hundleChange.bind(this)} value = {this.state.inputValue}/>
                  <Button type='submit' color = 'violet'>Add</Button>
                </Input>
              </form>
            </Segment>
            <Segment hidden = {yourBooks.length == 0}>
              <h2>Your books:</h2>
              <Card.Group>
                {this.renderList()}
              </Card.Group>
            </Segment>
          </Segment.Group>
        </Container>
      </NeedLogin>
    )
  }
}

const mapStateToProps = ({yourBooks}) => {
  return {yourBooks}
}
export default connect(mapStateToProps, {addBook, getYourBooks, deleteBook})(YourBooks)
