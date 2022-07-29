import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';

import Services from '../../services/services';

import Post from '../post/Post';
import AddPost from '../add-post/AddPost';
import CommentedPost from '../commented-post/CommentedPost';
import ModalWindow from '../modal/Modal';
import ChangePost from '../change-post/ChangePost';
import FirstPage from '../first-page/FirstPage';
import ErrorMessage from '../error/ErrorMessage';

import {increment, decrement, fixed, fetchPosts} from '../../redux/postsSlice';

function Posts() {
  const [posts1, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [showModal, setShowModal] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getResourse } = Services();
  const dispatch = useDispatch();
  const counter = useSelector(state => state.posts.counter);
  const posts = useSelector(state => state.posts.data);


  useEffect(() => {
    onPostLoading();
    setError(false);
  }, []);

  const onPostLoading = () => {
    dispatch(fetchPosts());
    getResourse('https://simple-blog-api.crew.red/posts')
      .then((result) => {
        setPosts(result);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
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
    setPosts(newPosts);
    onPostLoading();
  };

  const deletePost = (id) => {
    let allPosts = posts;
    allPosts = allPosts.filter((item) => item.id !== id);
    getResourse(`https://simple-blog-api.crew.red/posts/${id}`, 'DELETE').then(console.log('Ok'));
    setPosts(allPosts);
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
    setPosts(newArray);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingPosts = loading ? (
    <RingLoader size={300} color="#2337e9" cssOverride={{ display: 'block', margin: '0 auto' }} />
  ) : null;
  const postItems = !errorMessage && !loadingPosts ? displayPosts() : null;
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Add</button><br/>
      <button onClick={() => dispatch(decrement())}>Minus</button>
      <button onClick={() => dispatch(fixed(10))}>Set 10</button>
      <h1>{counter}</h1>
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
