import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Image, Button, Container, Divider, Segment} from 'semantic-ui-react'

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
            <Button color = 'violet' onClick={this.hundleTrade(_id)} disabled = {userID == owner}>trade</Button>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment><TradePanel /></Segment>
          <Segment>
            <h2>All books:</h2>
            <Card.Group>
              {this.renderList()}
            </Card.Group>
          </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({allBooks, user}) => {
  return {allBooks, user}
}
export default connect(mapStateToProps, {getAllBooks, trade})(AllBooks)
