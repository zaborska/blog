import { postsFetching, postsFetched, postsFetchingError } from '../posts/postsSlice';

export const fetchPosts = (getResourse) => (dispatch) => {
  dispatch(postsFetching());
  getResourse('https://simple-blog-api.crew.red/posts')
    .then((result) => {
      dispatch(postsFetched(result));
    })
    .catch(() => {
      dispatch(postsFetchingError());
    });
};
