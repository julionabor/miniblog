import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {

	return (
		<div className={styles.post_detail}>
			<img src={post.image} alt={post.title} />
			<h2>{post.title}</h2>
			<p className={styles.createdby}>Criado por {post.createdBy}</p>
			<div className={styles.tags}>
				{post.tagsArray.map((tag) => (
					<p key={tag}>
						<span>#</span>
						{tag}
					</p>
				))}
			</div>
			<Link to={`/posts/${post.id}`} className="btn btn-outline">
				Clique para ver mais +
			</Link>
		</div>
	);
};

export default PostDetail;
