import { configureStore } from '@reduxjs/toolkit';
import posts from '../posts/postsSlice';

const store = configureStore({
  reducer: { posts },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
