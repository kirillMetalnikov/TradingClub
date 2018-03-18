import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tab, Label, Menu, List, Button, Segment, Divider} from 'semantic-ui-react'

import {yourReq, forYourReq, cancelTrade, aproveTrade} from '../actions'

class TradePanel extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.yourReq()
    this.props.forYourReq()
  }

  renderYours(aproved, notAproved) {
    return (
      <div>
        <Segment hidden = {notAproved.length != 0 || aproved.length != 0}>
          <h3>You do not make a trade request</h3>
        </Segment>
        <Segment hidden = {notAproved.length == 0}>
          <h3>Not approved:</h3>
          <Divider/>
          <List divided relaxed>
            {notAproved.map( book => {
              return (
                <List.Item key = {book._id}>
                  <List.Content floated='right'>
                    <Button onClick ={this.hundleCancel(book._id)} color = 'orange'>Cancel</Button>
                  </List.Content>
                  <List.Content>
                    {book.title}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
        <Segment hidden = {aproved.length == 0}>
          <h3>Approved:</h3>
          <Divider/>
          <List divided relaxed>
            {aproved.map( book => {
              return (
                <List.Item key = {book._id}>
                  <List.Content floated='right'>
                    <Button onClick ={this.hundleCancel(book._id)} color = 'orange'>Cancel</Button>
                  </List.Content>
                  <List.Content>
                    {book.title}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
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

  hundleTabChange() {
    this.props.yourReq()
    this.props.forYourReq()
  }

  renderForYou(aproved, notAproved) {
    return (
      <div>
        <Segment hidden = {notAproved.length != 0 || aproved.length != 0}>
          <h3>You have no trade requests</h3>
        </Segment>
        <Segment hidden = {notAproved.length == 0}>
          <h3>Not approved:</h3>
          <Divider/>
          <List divided relaxed>
            {notAproved.map( book => {
              return (
                <List.Item key = {book._id}>
                  <List.Content floated='right'>
                    <Button onClick ={this.hundleAprove(book._id)} color = 'violet'>Aprove</Button>
                    <Button onClick ={this.hundleCancel(book._id)} color = 'orange'>Cancel</Button>
                  </List.Content>
                  <List.Content>
                    {book.title}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
        <Segment hidden = {aproved.length == 0}>
          <h3>Approved:</h3>
          <Divider/>
          <List divided relaxed>
            {aproved.map( book => {
              return (
                <List.Item key = {book._id}>
                  <List.Content floated='right'>
                    <Button onClick ={this.hundleCancel(book._id)} color = 'orange'>Cancel</Button>
                  </List.Content>
                  <List.Content>
                    {book.title}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
      </div>
    )
  }

  render() {
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
    const panes = [
      { menuItem: <Menu.Item key='yourTrade'>Your trade requests: <Label color='violet'>{yourNotAproved.length}/{yourRequests.length}</Label></Menu.Item>,
        render: () => {
          return <Tab.Pane>{this.renderYours(yourAproved, yourNotAproved)}</Tab.Pane>
        }
      },
      { menuItem: <Menu.Item key='foryourTrade'>Trade requests for you: <Label color='violet'>{forYourNotAproved.length}/{forYourRequests.length}</Label></Menu.Item>,
        render: () => {
          return <Tab.Pane>{this.renderForYou(forYourAproved, forYourNotAproved)}</Tab.Pane>
        }
      },
    ]
    return (
      <Tab panes={panes} onTabChange = {this.hundleTabChange.bind(this)}/>
    )
  }
}

function mapStateToProps({yourRequests, forYourRequests}) {
  return {yourRequests, forYourRequests}
}

export default connect(mapStateToProps, {yourReq, forYourReq, cancelTrade, aproveTrade})(TradePanel)
