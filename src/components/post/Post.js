import { Card, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Post.scss";

const Post = (props) => {
	const {id, title, post, onDelete, onOpen, onModalShow, getId} = props;
	
	const deletePost = (e) => {
		onDelete(e.target.getAttribute(['data-post-id']));
	};

	const openPost = (e) => {
		onOpen(e.target.getAttribute(['data-post-id']));
	};

	const get = (e) => {
		getId(e.target.getAttribute(['data-post-id']));
		onModalShow();
	};

	return (
		<div className="post" >
			<Card>
				<Card.Header as="h2">{title}</Card.Header>
				<Card.Body>
					<Card.Text>
						{post}
					</Card.Text>
					<Link to={`/posts/${id}`}>
						<Button variant="primary" onClick={openPost} data-post-id={id}>Open</Button>
					</Link>
					<Link to={`/posts/${id}/change`}>
						<Button variant="primary">Change</Button>
					</Link>
					<Button variant="primary" onClick={get} data-post-id={id}>Delete</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Post;
