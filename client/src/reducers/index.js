import {combineReducers} from 'redux'
import {GET_CURRENT_USER} from '../consts.js'
//import user from './user'

const user = (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      console.log(action)
      return action.user
    default:
      return state
  }
}

export default combineReducers({
  user
})
