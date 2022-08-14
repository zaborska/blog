import { postsFetching, postsFetched, postsFetchingError } from '../slices/postsSlice';
import api from '../services/api';

export const fetchPosts = (getResourse) => (dispatch) => {
  dispatch(postsFetching());
  // getResourse('https://simple-blog-api.crew.red/posts')
  api
    .getPosts()
    .then((result) => {
      dispatch(postsFetched(result));
    })
    .catch(() => {
      dispatch(postsFetchingError());
    });
};
