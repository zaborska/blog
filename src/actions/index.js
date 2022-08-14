import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsFetchStart, postsFetchFinish, postsFetchFail } from '../slices/postsSlice';

import api from '../services/api';

export const fetchPosts = () => (dispatch) => {
  dispatch(postsFetchStart());
  api
    .getPosts()
    .then((result) => {
      dispatch(postsFetchFinish(result));
    })
    .catch(() => {
      dispatch(postsFetchFail());
    });
};
