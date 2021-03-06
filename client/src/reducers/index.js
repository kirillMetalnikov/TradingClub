import {combineReducers} from 'redux'
import {
  GET_CURRENT_USER,
  GET_ALL_BOOKS,
  GET_YOUR_BOOKS,
  ADD_YOUR_BOOK,
  DELETE_BOOK,
  TRADE_BOOK,
  GET_YOUR_REQUESTS,
  GET_FOR_YOUR_REQUESTS,
  CANCEL_TRADE,
  APROVE_TRADE,
  MESSAGE_CHANGE_PASSWORD,
  MESSAGE_CHANGE_PROFILE,
  MESSAGE_LOGIN,
  CLEAR_MESSAGES,
  MESSAGE_SIGNUP
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
        return book._id != action.book._id
      })
    case CANCEL_TRADE: {
      var {book} = action
      return [...state, Object.assign({}, book)]
    }
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
    case CANCEL_TRADE: {
      var {book: {_id}} = action
      return state.filter( book => {
        return book._id != _id
      })
    }
    case TRADE_BOOK:
      var {book} = action
      return [...state, Object.assign({}, book)]
    default:
      return state
  }
}

const forYourRequests = ( state = [], action) => {
  switch (action.type) {
    case GET_FOR_YOUR_REQUESTS:
      return action.books
    case CANCEL_TRADE: {
      var {book: {_id}} = action
      return state.filter( book => {
        return book._id != _id
      })
    }
    case APROVE_TRADE: {
      var {book: {_id}} = action
      return state.map( book => {
        if (book._id != _id) return book
        return action.book
      })
    }
    default:
      return state
  }
}

const messages = (
  state = {
    changePasswordForm: null,
    changeProfileForm: null,
    loginForm: null,
    signUpForm: null
  },
  action) => {
    switch (action.type) {
      case MESSAGE_CHANGE_PASSWORD:
        var {changePasswordForm} = action
        var newState = Object.assign({}, state)
        newState.changePasswordForm = changePasswordForm
        return newState
      case MESSAGE_CHANGE_PROFILE:
        var {changeProfileForm} = action
        var newState = Object.assign({}, state)
        newState.changeProfileForm = changeProfileForm
        return newState
      case MESSAGE_LOGIN:
        var {loginForm} = action
        var newState = Object.assign({}, state)
        newState.loginForm = loginForm
        return newState
      case MESSAGE_SIGNUP:
        var {signUpForm} = action
        var newState = Object.assign({}, state)
        newState.signUpForm = signUpForm
        return newState
      case CLEAR_MESSAGES:
        return {
          changePasswordForm: null,
          changeProfileForm: null,
          loginForm: null,
          signUpForm: null
        }
      default:
        return state
  }
}
export default combineReducers({
  user,
  allBooks,
  yourBooks,
  yourRequests,
  forYourRequests,
  messages
})
