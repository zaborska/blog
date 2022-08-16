import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { fetchPosts, deletePosts } from '../../actions';
import Post from '../post/Post';
import AddPost from '../add-post/AddPost';
import CommentedPost from '../commented-post/CommentedPost';
import ModalWindow from '../modal/Modal';
import ChangePost from '../change-post/ChangePost';
import FirstPage from '../first-page/FirstPage';
import ErrorMessage from '../error/ErrorMessage';

function Posts() {
  const [postId, setPostId] = useState(null);
  const [showModal, setShowModal] = useState('');
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    dispatch(fetchPosts());
  };

  const displayPosts = () => {
    const postsCount = posts.length;
    const reversPosts = [];

    posts.map((item, i) => (reversPosts[postsCount - i - 1] = item));
    return reversPosts.map((item) => (
      <Post
        post={item.body}
        title={item.title}
        id={item.id}
        key={item.id}
        // onDelete={deletePost}
        onOpen={openPost}
        onModalShow={onOpenModal}
        getId={getId}
      />
    ));
  };

  const addNewPost = (newPost) => {
    const newPosts = posts;
    newPosts.push(newPost);
    // setPosts(newPosts);
    loadPosts();
  };

  const deletePost = (id) => {
    const allPosts = posts.filter((item) => +item.id !== +id);
    // getResourse(`https://simple-blog-api.crew.red/posts/${id}`, 'DELETE').then(console.log('Ok'));
    // dispatch(postDeleted(allPosts));
    dispatch(deletePosts(id));
	setShowModal('');
  };

  const onOpenModal = () => {
    setShowModal('show');
  };

  const onCloseModal = () => {
    setShowModal('');
  };

  const openPost = (id) => {
    setPostId(id);
  };

  const getId = (id) => {
    setPostId(id);
  };

  const onChangePost = (changedPost) => {
    let newArray = [...posts];
    newArray = newArray.map((item) => {
      if (changedPost.id !== item.id) {
        return item;
      }
      return changedPost;
    });
    //  setPosts(newArray);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingPosts = loading ? (
    <RingLoader size={300} color="#2337e9" cssOverride={{ display: 'block', margin: '0 auto' }} />
  ) : null;
  const postItems = !errorMessage && !loadingPosts ? displayPosts() : null;
  return (
    <div>
      <Routes>
        <Route path="/add-post" element={<AddPost onSuccess={addNewPost} />} />

        <Route
          path="/posts"
          element={
            <div className="posts">{error ? errorMessage : loading ? loadingPosts : postItems}</div>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <CommentedPost
              onDelete={deletePost}
              showModal={showModal}
              onClose={onCloseModal}
              onModalShow={onOpenModal}
            />
          }
        />

        <Route
          path="/posts/:id/change"
          element={<ChangePost posts={posts} onSuccess={onChangePost} />}
        />

        <Route path="/" element={<FirstPage />} />
      </Routes>

      <ModalWindow
        showModal={showModal}
        onDelete={deletePost}
        onClose={onCloseModal}
        postId={postId}
      />
    </div>
  );
}

export default Posts;
