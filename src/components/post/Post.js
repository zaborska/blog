import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postIdSet } from '../posts/postsSlice';

import './Post.scss';

function Post(props) {

  const { id, title, post, onDelete, onOpen, onModalShow, getId } = props;

  const dispatch = useDispatch();
  
  const deletePost = (e) => {
    onDelete(e.target.getAttribute(['data-post-id']));
  };

  const openPost = (e) => {
    dispatch(postIdSet(e.target.getAttribute(['data-post-id'])));
	// onOpen(e.target.getAttribute(['data-post-id']));
  };

  const get = (e) => {
    dispatch(postIdSet(e.target.getAttribute(['data-post-id'])));
	// getId(e.target.getAttribute(['data-post-id']));
    onModalShow();
  };

  return (
    <div className="post">
      <Card>
        <Card.Header as="h2">{title}</Card.Header>
        <Card.Body>
          <Card.Text>{post}</Card.Text>
          <Link to={`/posts/${id}`}>
            <Button variant="primary" onClick={openPost} data-post-id={id}>
              Open
            </Button>
          </Link>
          <Link to={`/posts/${id}/change`}>
            <Button variant="primary">Change</Button>
          </Link>
          <Button variant="primary" onClick={get} data-post-id={id}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
