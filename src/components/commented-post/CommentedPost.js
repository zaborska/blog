import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postIdSet } from '../../slices/postsSlice';
import Post from '../post/Post';
// import Services from '../../services/api';
import ModalWindow from '../modal/Modal';

function CommentedPost(props) {
  const { id } = useParams();
  // const { getResourse } = Services();
  const [post, setPost] = useState([]);
  const { onDelete, onClose, showModal, onModalShow } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    // getResourse(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`).then((result) => {
    //   setPost(result);
    // });
  }, []);

  const getComments = () => {
    if (post.comments) {
      const comments = post.comments.map((item) => (
        <ListGroupItem key={item.id}>{item.body}</ListGroupItem>
      ));
      return comments;
    }
    return null;
  };

  return (
    <div className="post">
      <Card>
        <Card.Body>
          <Card.Title as="h2">{post.title}</Card.Title>
          <Card.Text as="h3">{post.body}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <i>{getComments()}</i>
        </ListGroup>
        <Card.Body>
          <Link to="/posts" className="card-link" onClick={() => dispatch(postIdSet(null))}>
            Back
          </Link>
          <Link to={`/posts/${id}/change`} className="card-link">
            Change
          </Link>
          <Card.Link href="#" onClick={onModalShow}>
            Delete
          </Card.Link>
        </Card.Body>
      </Card>
      <ModalWindow showModal={showModal} onClose={onClose} onDelete={onDelete} />
    </div>
  );
}

export default CommentedPost;
