import {FETCH_POSTS} from '../_constants/actionTypes';
import axios from 'axios';

export const fetchPosts = (posts) => ({
  type: FETCH_POSTS,
  payload: posts
});

export const fetchAllPosts = () => dispatch => {
  axios.get("api/p/all")
  .then (response => {dispatch(fetchPosts(response.data))})
  .catch(err => console.log(err))
}