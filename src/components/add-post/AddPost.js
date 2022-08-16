import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { RingLoader } from 'react-spinners';
import { addPost } from '../../actions';
import ErrorMessage from '../error/ErrorMessage';

import './addPost.scss';

function AddPost(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);

  const onInput = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
    // this.setState({
    // 	[e.target.name]: e.target.value,
    // });
  };

  const onAddPost = () => {
    // const data = JSON.stringify({ title, body });
    // getResourse('https://simple-blog-api.crew.red/posts', 'POST', data)
    //   .then((result) => {
    //     dispatch(postCreated(result));
    //     // props.onSuccess(result);
    //   })
    //   .then(() => {
    //     setTitle('');
    //     setBody('');
    //   });
	const data = JSON.stringify({ title, body });
  dispatch(addPost(data));
  if(!loading) {
    setTitle('');
	setBody('');
  }

  };

  const isDisabled = !title || !body;

  const errorMessage = error ? <ErrorMessage /> : null;
  const addingPost = loading ? (
    <RingLoader size={300} color="#2337e9" cssOverride={{ display: 'block', margin: '0 auto' }} />
  ) : null;
  const postItems = !errorMessage && !addingPost ? <View title={title} body={body} onInput={onInput} onAddPost={onAddPost} isDisabled={isDisabled}/> : null;

  return (
	<>
		{errorMessage}
		{addingPost}
		{postItems}
	</>
  )
}

function View({title, body, onInput, onAddPost, isDisabled}) {
	return (
		<div className="add-new-post">
		  <Form>
			<FloatingLabel controlId="floatingInput" label="Add post title" className="mb-3">
			  <Form.Control
				onChange={onInput}
				name="title"
				type="text"
				placeholder="Add post title"
				className="title"
				value={title}
			  />
			</FloatingLabel>
			<FloatingLabel controlId="floatingTextarea2" label="Write your post">
			  <Form.Control
				onChange={onInput}
				name="body"
				as="textarea"
				className="add-post"
				placeholder="Write your post"
				value={body}
			  />
			</FloatingLabel>
			<Button
			  variant="primary"
			  className="add-post-btn"
			  onClick={onAddPost}
			  disabled={isDisabled}
			>
			  Add Post
			</Button>
		  </Form>
		</div>
	  );
}

export default AddPost;
// {
// 	"title": "test",
// 	"body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas molestias laborum voluptas quia porro ullam alias? Deleniti velit iure inventore rerum, commodi sit fuga in labore quo, laudantium ducimus repudiandae?"
// }
