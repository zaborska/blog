import './first-page.scss';
import { Link } from 'react-router-dom';
const FirstPage = () => {
	return (
		<div className="first-page">
			<h1>Your Personal Posts Site</h1>
			<h2>You can read, add, delete and comment on posts</h2>
			<Link to={"/posts"}><button className='btn btn-success'>Load all posts</button></Link>
		</div>
	);
};

export default FirstPage;