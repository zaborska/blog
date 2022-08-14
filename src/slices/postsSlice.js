import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  postId: null,
  showModal: '',
  error: false,
  loading: true
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsFetching: (state) => {
      state.loading = true;
      state.error = false;
    },
    postsFetched: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postsFetchingError: (state) => {
      state.loading = false;
      state.error = true;
    },
    postCreated: (state, action) => {
      state.posts.push(action.payload);
    },
    postDeleted: (state, action) => {
      state.posts = action.payload;
      // state.posts.filter(item => item.id !== action.payload);
    },
    postIdSet: (state, action) => {
      state.postId = action.payload;
    }
  }
});

const { actions, reducer } = postsSlice;

export const {
  postsFetching,
  postsFetched,
  postsFetchingError,
  postCreated,
  postDeleted,
  postIdSet
} = actions;

// export const selectCount = (state) => state.counter.value;

export default reducer;
