import {combineReducers} from 'redux'
import {
  GET_CURRENT_USER,
  GET_ALL_BOOKS,
  GET_YOUR_BOOKS,
  ADD_YOUR_BOOK,
  DELETE_BOOK,
  TRADE_BOOK,
  GET_YOUR_REQUESTS,
  GET_FOR_YOUR_REQUESTS
} from '../consts.js'
//import user from './user'

const user = (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.user
    default:
      return state
  }
}

const allBooks = ( state = [], action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return action.books
    case DELETE_BOOK:
      return state.filter( book => {
        return book._id != action._id
      })
    case TRADE_BOOK:
      return state.filter( book => {
        return book._id != action._id
      })
    default:
      return state
  }
}

const yourBooks = ( state = [], action) => {
  switch (action.type) {
    case GET_YOUR_BOOKS:
      return action.books
    case ADD_YOUR_BOOK:
      var {book} = action
      return [...state, Object.assign({}, book)]
    case DELETE_BOOK:
      return state.filter( book => {
        return book._id != action._id
      })
    default:
      return state
  }
}

const yourRequests = ( state = [], action) => {
  switch (action.type) {
    case GET_YOUR_REQUESTS:
      return action.books
    default:
      return state
  }
}

const forYourRequests = ( state = [], action) => {
  switch (action.type) {
    case GET_FOR_YOUR_REQUESTS:
      return action.books
    default:
      return state
  }
}

export default combineReducers({
  user,
  allBooks,
  yourBooks,
  yourRequests,
  forYourRequests
})
