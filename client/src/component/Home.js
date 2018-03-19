import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Header, Segment, Icon, Card} from 'semantic-ui-react'

class Home extends Component {
  render() {
    return (
      <Container>
        <div style = {{marginBottom: '10%', paddingTop: '10%'}}>
          <Header
            size='huge'
            content='BookJump'
            inverted
            textAlign='center'
          />
          <Header
            size='medium'
            content={"The first rule of bookjump is don't talk about bookjump."}
            inverted
            textAlign='center'
          />
        </div>
        <Card.Group centered>
          <Card>
            <Card.Content textAlign ='center'>
              <Icon size = 'huge' name='book'/>
              <Card.Header>Catalogue your books</Card.Header>
              <Card.Meta>online</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content textAlign ='center'>
              <Icon size = 'huge' name='user'/>
              <Card.Header> See all of the books</Card.Header>
              <Card.Meta>our users own</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content textAlign ='center'>
              <Icon size = 'huge' name='share'/>
              <Card.Header>Request to borrow</Card.Header>
              <Card.Meta>{"other users' books"}</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content textAlign ='center'>
              <Icon size = 'huge' name='exchange'/>
              <Card.Header>Easily manage books and requests</Card.Header>
              <Card.Meta>from your dashboard</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    )
  }
}

export default connect()(Home)
