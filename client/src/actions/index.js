import axios from 'axios'
import history from '../history'
import qs from 'qs'

import {GET_CURRENT_USER, GET_ALL_BOOKS, GET_YOUR_BOOKS, ADD_YOUR_BOOK, DELETE_BOOK} from '../consts.js'

export const getCurrentUser = () => dispatch => {
  axios.get('/api/current_user')
    .then(res => {
      var {user} = res.data
      dispatch({type: GET_CURRENT_USER, user})
    })
}

export const signUp = (name, email, password) => dispatch => {
  axios.post('/auth/signup', {name, email, password})
    .then(res => {
      var {user} = res.data
      if (user) history.push('/yourbooks')
      dispatch({type: GET_CURRENT_USER, user})
    })
}


export const login = (email, password) => dispatch => {
  axios.post('/auth/login', qs.stringify({username: email, password}))
    .then(res => {
      var {user} = res.data
      if (user) history.push('/yourbooks')
      dispatch({type: GET_CURRENT_USER, user})
    })
    .catch((err) => {
      var {message} = err.response.data
      console.log(message)
    })
}

export const changeProfile = (name, location) => dispatch => {
  axios.put('/api/profile', {name, location})
    .then( res => {
      var {user} = res.data
      if(user) {
        dispatch({type: GET_CURRENT_USER, user})
      }
    })
}

export const changePassword = (oldPassword, newPassword) => dispatch => {
  axios.put('/api/password', {oldPassword, newPassword})
    .then( res => {
      var {user} = res.data
      if(user) {
        dispatch({type: GET_CURRENT_USER, user})
      }
    })
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
