import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from '../_constants/actionTypes';
import setAuthToken from '../../utils/setAuthToken';

import jwt_decode  from 'jwt-decode';

export const registerUser = (user,history) => dispatch => {
  axios.post('api/u/register', user)
    .then(res => history.push('/signin'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })
    })
}

export const loginUser = (user, history) => dispatch => {
  axios.post('api/u/login', user)
    .then(res => {
      const {token} = res.data;
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)
      let decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      history.push("/")
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logOutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}))
  history.push("/login")
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}