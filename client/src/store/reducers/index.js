import {combineReducers} from'redux';
import errorsReducer from '../reducers/errorsReducer'

const rootReducer = combineReducers({
  errorsReducer
})

export default rootReducer;