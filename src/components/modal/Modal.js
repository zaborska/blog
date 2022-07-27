import {Modal, Button} from "react-bootstrap";
import "./modal.scss";
import { Link } from "react-router-dom";

const ModalWindow = ({ showModal, onClose, onDelete, postId}) => {
	return (
		<div className={`modal ${showModal}`}>
			<div className="modal__content">
				<Modal.Dialog>
					<Modal.Header closeButton onClick={()=>{onClose();}}>
						<Modal.Title>Delete post?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete this post?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={()=>{onClose();}}>No</Button>
						<Button variant="primary" onClick={()=>{onDelete(postId);}}><Link to={"/posts"}>Yes</Link></Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		</div>
	);
};

export default ModalWindow;