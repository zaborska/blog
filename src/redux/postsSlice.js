import { createSlice } from '@reduxjs/toolkit';
import Services from '../services/services';

const initialState = {
  data: [],
  loading: false,
  error: {},
  counter: 1,
};

const { getResourse } = Services();

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1
    },
    fixed: (state, action) => {
      console.log(action);
      state.counter = action.payload
    },
    load: (state) => {
      state.posts.push(1);
    },
    postsLoading: (state) => {
      state.loading = true;
    },
    postsReceived: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    }
  }
});

export const { load, increment, decrement, fixed, postsLoading, postsReceived } = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPosts = () => async (dispatch) => {
  dispatch(postsLoading())
  const posts = await getResourse('https://simple-blog-api.crew.red/posts');

  console.log(posts);
      
  dispatch(postsReceived(posts));
}

