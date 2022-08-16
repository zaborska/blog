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

    postsCreateStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postsCreateFinish: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
      // state.posts = action.payload;
    },
    postsCreateFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    postChangeStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postChangeFinish: (state, action) => {
      state.loading = false;
	  const newPosts = state.posts.map((item)=> {
		if(item.id === action.payload.id) {
			return action.payload;
		}
		return item;
	  });
	  state.posts = newPosts;
      // state.posts = action.payload;
    },
    postChangeFail: (state) => {
      state.loading = false;
      state.error = true;
    },

	commentCreateFinish: (state) => {
	  state.loading = false;
    state.error = false;
	},
    // postCreated: (state, action) => {
    //   state.posts.push(action.payload);
    // },
    // delete post
    // TODO
    // postDeleteStart
    // postDeleteFinish
    // postDeleteFail

    postsDeleteStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postsDeleteFinish: (state, action) => {
      state.loading = false;
      let index
      state.posts.forEach((item,i) => {
        if(item.id === +action.payload) {
          index = i;
        }
      });
      state.posts.splice(index, 1);

      // state.posts = action.payload;
    },
    postsDeleteFail: (state) => {
      state.loading = false;
      state.error = true;
    },

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
  postsCreateStart,
  postsCreateFinish,
  postsCreateFail,
  postChangeStart,
  postChangeFinish,
  postChangeFail,
  commentCreateFinish,
  postsDeleteStart,
  postsDeleteFinish,
  postsDeleteFail,
  postIdSet
} = actions;

export default reducer;
