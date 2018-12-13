import {combineReducers} from'redux';
import errors from '../reducers/errorsReducer'
import auth from '../reducers/authReducer';
import posts from '../reducers/postReducer'

export default combineReducers({
  errors,
  auth,
  posts
})