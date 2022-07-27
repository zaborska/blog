import { useState } from "react";

import Services from "../../services/services";
import { Form, FloatingLabel, Button } from "react-bootstrap";

import "./addPost.scss";

const AddPost = (props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
		
	const {getResourse} = Services();

	const onInput = (e) => {
		if(e.target.name === "title") {
			setTitle(e.target.value);
		} else {
			setBody(e.target.value);
		}
		// this.setState({
		// 	[e.target.name]: e.target.value,
		// });
	};

	const onAddPost = () => {
		const data = JSON.stringify({title, body});
		getResourse("https://simple-blog-api.crew.red/posts", "POST", data)
			.then((result) => {
				props.onSuccess(result);
			})
			.then(() => {
				setTitle("");
				setBody("");
			});
	};

	const isDisabled = !title || !body; 
	return (
		<div className="add-new-post">
			<Form>
				<FloatingLabel
					controlId="floatingInput"
					label="Add post title"
					className="mb-3"
				>
					<Form.Control 
						onChange={onInput} 
						name="title" 
						type="text" 
						placeholder="Add post title" 
						className="title"
						value={title}
					/>
				</FloatingLabel>
				<FloatingLabel 
					controlId="floatingTextarea2" 
					label="Write your post"
				>
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
};

export default AddPost;
// {
// 	"title": "test",
// 	"body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas molestias laborum voluptas quia porro ullam alias? Deleniti velit iure inventore rerum, commodi sit fuga in labore quo, laudantium ducimus repudiandae?"
// }
