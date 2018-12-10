import {combineReducers} from'redux';
import errorsReducer from '../reducers/errorsReducer'

export default combineReducers({
  errors: errorsReducer
})