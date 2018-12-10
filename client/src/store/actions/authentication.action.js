import axios from 'axios';
import {GET_ERRORS} from '../_constants/actionTypes';

export const registerUser = (user,history) => dispatch => {
  axios.post('api/u/register', user)
    .then(res => history.push('/signin'))
    .catch(err => {
      console.log(err.response.data)
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })
    })
}

export const loginUser = (user, history) => dispatch => {
  axios.post('api/u/login', user)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}