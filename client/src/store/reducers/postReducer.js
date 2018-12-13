import {FETCH_POSTS} from '../_constants/actionTypes';

const initialState = {
  posts: [],
  post: {}
};

export default function(state=initialState, action) {
  switch(action.type){
    case FETCH_POSTS:
      console.log(action.payload);
      return {...state, posts: action.payload}
    default:
      return state
  }
}