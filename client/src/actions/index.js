import axios from 'axios'
import history from '../history'
import qs from 'qs'

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

export const getCurrentUser = () => dispatch => {
  axios.get('/api/current_user')
    .then(res => {
      var {user} = res.data
      dispatch({type: GET_CURRENT_USER, user})
    })
}

export const signUp = (name, email, password) => dispatch => {
  if ( ! /^[\w\d%$:.-]+@\w+\.\w{2,5}$/.test(email) ) {
    dispatch({type: MESSAGE_SIGNUP, signUpForm: {type: 'error', header: 'Error!', text: 'Email is not valid'}})
  } else if ( password.length < 3 ) {
    dispatch({type: MESSAGE_SIGNUP, signUpForm: {type: 'error', header: 'Error!', text: 'Password need more than 3 symbols'}})
  } else {
    axios.post('/auth/signup', {name, email, password})
      .then(res => {
        var {user, message} = res.data

        if(message && message.type == 'email') {
          dispatch({type: MESSAGE_SIGNUP, signUpForm: {type: 'error', header: 'Error!', text: message.text}})
        }
        if (user) {
          history.push('/yourbooks')
          dispatch({type: GET_CURRENT_USER, user})
        }
      })
  }
}


export const login = (email, password) => dispatch => {
  axios.post('/auth/login', qs.stringify({username: email, password}))
    .then(res => {
      var {user} = res.data
      if (user) history.push('/yourbooks')
      dispatch({type: GET_CURRENT_USER, user})
      dispatch({type: MESSAGE_LOGIN, loginForm: null})
    })
    .catch((err) => {
      var {message} = err.response.data
      dispatch({type: MESSAGE_LOGIN, loginForm: {type: 'error', header: 'Error!', text: message}})
    })
}

export const logout = () => dispatch => {
  axios.get('/auth/logout')
    .then( () => {
      history.push('/')
      dispatch({type: GET_CURRENT_USER, user: null})
    })
}

export const changeProfile = (name, location) => dispatch => {
  axios.put('/api/profile', {name, location})
    .then( res => {
      var {user} = res.data
      if(user) {
        dispatch({type: GET_CURRENT_USER, user})
        dispatch({type: MESSAGE_CHANGE_PROFILE, changeProfileForm: {type: 'success', header: 'Success', text: 'Profile have been changed'}})
      }
    })
}

export const changePassword = (oldPassword, newPassword) => dispatch => {
  if(newPassword.length < 3) {
    dispatch({type: MESSAGE_CHANGE_PASSWORD, changePasswordForm: {type: 'error', header: 'Error!', text: 'Password need more than 3 symbols'}})
    return
  }
  axios.put('/api/password', {oldPassword, newPassword})
    .then( res => {
      var {user, message} = res.data
      if(message && message.type == 'password') {
        dispatch({type: MESSAGE_CHANGE_PASSWORD, changePasswordForm: {type: 'error', header: 'Error!', text: message.text}})
      }
      if(user) {
        dispatch({type: MESSAGE_CHANGE_PASSWORD, changePasswordForm: {type: 'success', header: 'Success', text: 'Password have been changed'}})
        dispatch({type: GET_CURRENT_USER, user})
      }
    })
}

export const clearMessage = () => dispatch => {
  dispatch({type: CLEAR_MESSAGES})
}

export const addBook = book => dispatch => {
  axios.post('/api/books', {search: book})
    .then( res => {
      var {book} = res.data
      dispatch({type: ADD_YOUR_BOOK, book})
    })
}

export const getAllBooks = () => dispatch => {
  axios.get('/api/books')
    .then(res => {
      var {books} = res.data
      dispatch({type: GET_ALL_BOOKS, books})
    })
}

export const getYourBooks = () => dispatch => {
  axios.get('/api/books/your')
    .then( res => {
      var {books} = res.data
      dispatch({type: GET_YOUR_BOOKS, books})
    })
}

export const deleteBook = (_id) => dispatch => {
  axios.delete('/api/books', {data: {_id}})
    .then(res => {
      var {_id} = res.data
      dispatch({type: DELETE_BOOK, _id})
    })
}

export const trade = (_id) => dispatch => {
  axios.put('/api/books/trade', {_id})
    .then(res => {
      var {book} = res.data
      dispatch({type: TRADE_BOOK, book})
    })
}

export const yourReq = () => dispatch => {
  axios.get('/api/requests/your')
    .then(res => {
      var {books} = res.data
      dispatch({type: GET_YOUR_REQUESTS, books})
    })
}


export const forYourReq = () => dispatch => {
  axios.get('/api/requests/for_you')
    .then(res => {
      var {books} = res.data
      dispatch({type: GET_FOR_YOUR_REQUESTS, books})
    })
}

export const cancelTrade = (_id) => dispatch => {
  axios.put('/api/books/trade/delete', {_id})
    .then(res => {
      var {book} = res.data
      dispatch({type: CANCEL_TRADE, book})
    })
}

export const aproveTrade = (_id) => dispatch => {
  axios.put('/api/books/trade/aprove', {_id})
    .then(res => {
      var {book} = res.data
      dispatch({type: APROVE_TRADE, book})
    })
}
