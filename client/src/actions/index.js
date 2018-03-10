import axios from 'axios';
import {GET_CURRENT_USER} from '../consts.js'

export const getCurrentUser = () => dispatch => {
  axios.get('/api/current_user').then(res => {
    var {user} = res.data
    dispatch({type: GET_CURRENT_USER, user});
  })
}
