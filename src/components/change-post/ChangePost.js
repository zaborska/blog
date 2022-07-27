import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Services from "../../services/services";

const ChangePost = ({posts, onSuccess}) => {
	const {id} = useParams();
	const [changePost, setChangePost] = useState(null);
	
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [comment, setComment] = useState(null);
		
	const {getResourse} = Services();

	useEffect(() => {
		const post = posts.filter(item => {
			if(item.id == id) {
				setChangePost(item);
				setTitle(item.title);
				setBody(item.body);
			}
		});
	},[]);
	
	const onInput = (e) => {
		if(e.target.name === "title") {
			setTitle(e.target.value);
		} else {
			setBody(e.target.value);
		}
	};

	const onComment = (e) => {
		setComment(e.target.value);
	};

	const onAddPost = () => {
		const data = JSON.stringify({title, body});
		getResourse(`https://simple-blog-api.crew.red/posts/${id}`, "PUT", data)
			.then((result) => {
				onSuccess(result);
			})
			.then(() => {
				setTitle("");
				setBody("");
			});
	};

	const onAddComment = () => {
		const data = JSON.stringify({"postId": +id, "body": comment});
		console.log(data);
		getResourse(`https://simple-blog-api.crew.red/comments`, "POST", data)
			.then((result) => {
				console.log();
			})
			.then(() => {
				setComment("");
			});
	};

	const isDisabled = !title || !body;

	return (
		<>
			<div className="add-new-post">
				<Form>
					<FloatingLabel
						controlId="floatingInput"
						label="Add post title"
						className="mb-3"
					>
						<Form.Control 
							name="title" 
							type="text" 
							placeholder="Add post title" 
							className="title"
							value={title}
							onChange={onInput}
						/>
					</FloatingLabel>
					<FloatingLabel 
						controlId="floatingTextarea2" 
						label="Write your post"
					>
						<Form.Control
							name="body"
							as="textarea"
							className="add-post"
							placeholder="Write your post"
							value={body}
							onChange={onInput}
						/>
					</FloatingLabel>
					<Button 
						variant="outline-primary" 
						className="add-post-btn"
						onClick={onAddPost} 
						disabled={isDisabled} 	
					>
						<Link to={"/posts"}>Confirm</Link> 
					</Button>
				</Form>
			</div>

			<div className="add-new-post">
				<Form>
					<FloatingLabel 
						controlId="floatingTextarea2" 
						label="Write your comment"
					>
						<Form.Control
							onChange={onComment}
							name="comment"
							as="textarea"
							className="add-post"
							placeholder="Write your comment"
							value={comment ? comment : ""}
						/>
					</FloatingLabel>
					<Button 
						variant="outline-primary" 
						className="add-post-btn" 
						onClick={onAddComment} 
					>
						Add Comment
					</Button>
				</Form>
			</div>
		</>
	);
};

export default ChangePost;