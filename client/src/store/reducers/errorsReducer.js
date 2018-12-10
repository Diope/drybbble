import {GET_ERRORS} from '../_constants/actionTypes';

const initialState = {};

export default function(state=initialState, action) {
  switch(action.type){
    case GET_ERRORS:
      return action.payload
    default:
      return state
  }
}