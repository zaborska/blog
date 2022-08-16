import { postsFetchStart, 
		postsFetchFinish, 
		postsFetchFail, 
		postCreateStart, 
		postCreateFinish, 
		postCreateFail,
		postChangeStart,
		postChangeFinish,
		postChangeFail,
		commentCreateFinish,
		postsDeleteStart,
		postsDeleteFinish,
		postsDeleteFail 
	} from '../slices/postsSlice';

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

export const addPost = (data) => (dispatch) => {
	dispatch(postCreateStart());
	api
	  .addPost(data)
	  .then((result) => {
		dispatch(postCreateFinish(result));
	  })
	  .catch(() => {
		dispatch(postCreateFail());
	  });
  };

  export const changePosts = (id, data) => (dispatch) => {
	dispatch(postChangeStart());
	api
	  .changePost(id, data)
	  .then((result) => {
		dispatch(postChangeFinish(result));
	  })
	  .catch(() => {
		dispatch(postChangeFail());
	  });
  };

  export const addComment = (data) => (dispatch) => {
	dispatch(postCreateStart());
	api
	  .addComment(data)
	  .then((result) => {
		dispatch(commentCreateFinish());
	  })
	  .catch(() => {
		dispatch(postCreateFail());
	  });
  };

  export const deletePosts = (id) => (dispatch) => {
	dispatch(postsDeleteStart());
	api
	  .deletePost(id)
	  .then((result) => {
		dispatch(postsDeleteFinish(id));
	  })
	  .catch(() => {
		dispatch(postCreateFail());
	  });
  };
