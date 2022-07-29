import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});
