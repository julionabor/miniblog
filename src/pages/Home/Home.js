import styles from "./Home.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import PostDetail from "../../components/PostDetail";

const Home = () => {
	const [query, setQuery] = useState("");
	const { documents: posts, loading } = useFetchDocuments("posts");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
		<div className={styles.home}>
			<h1>Veja os nossos posts mais recentes</h1>
			<form onSubmit={handleSubmit} className={styles.search_form}>
				<input
					type="text"
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Ou busque por tags..."
				/>
				<button className="btn btn dark">Pesquisar</button>
			</form>
			<div className={styles.home}>
				{loading && <p>A carregar...</p>}
				{posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.noposts}>
						<p>Não foram encontrados posts</p>
						<Link to="/posts/create" className="btn">
							Criar primeiro post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
