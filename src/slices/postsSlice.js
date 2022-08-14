import { createSlice } from '@reduxjs/toolkit';

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
    // fetch posts
    postsFetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postsFetchFinish: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postsFetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    // create post
    // TODO
    // postCreateStart
    // postCreateFinish
    // postCreateFail
    postCreated: (state, action) => {
      state.posts.push(action.payload);
    },
    // delete post
    // TODO
    // postDeleteStart
    // postDeleteFinish
    // postDeleteFail
    postDeleted: (state, action) => {
      state.posts = action.payload;
      // state.posts.filter(item => item.id !== action.payload);
    },
    //
    postIdSet: (state, action) => {
      state.postId = action.payload;
    }
  }
});

const { actions, reducer } = postsSlice;

export const {
  postsFetchStart,
  postsFetchFinish,
  postsFetchFail,
  postCreated,
  postDeleted,
  postIdSet
} = actions;

export default reducer;
