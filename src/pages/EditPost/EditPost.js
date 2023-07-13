import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import styles from "./EditPost.module.css";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id);

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setBody(post.body);
			setImage(post.image);

			const textTags = post.tagsArray.join(", ");
			setTags(textTags);
		}
	}, [post]);

	const { user } = useAuthValue();

	const { updateDocument, response } = useUpdateDocument("posts");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");
		// validate image URL
		try {
			new URL(image);
		} catch (error) {
			setFormError("A imagem precisar ser uma URL");
		}

		// Array tags
		const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

		// check values
		if (!title || !image || !tags || !body) {
			setFormError("Por favor, preencha todos os campos!");
		}
		if (formError) return;

		const data = {
			title,
			image,
			body,
			tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		};

		updateDocument(id, data);
		// redirect
		navigate("/dashboard");
	};
	return (
		<div className={styles.edit_post}>
			{post && (
				<>
					<h2>Editar post: {post.title}</h2>
					<p>Altere os dados do post como desejar.</p>
					<form onSubmit={handleSubmit}>
						<label>
							<span>Título: </span>
							<input
								type="text"
								name="title"
								value={title}
								required
								placeholder="Insira o título"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label>
							<span>URL: </span>
							<input
								type="text"
								name="url"
								value={image}
								required
								placeholder="Insira uma imagem que representa o seu post."
								onChange={(e) => setImage(e.target.value)}
							/>
						</label>
						<p className={styles.preview_title}>Preview da imagem actual:</p>
						<img
							src={post.image}
							alt={post.title}
							className={styles.image_preview}
						/>
						<label>
							<span>Conteudo: </span>
							<textarea
								type="text"
								name="body"
								value={body}
								required
								placeholder="Insira uma imagem que representa o seu post."
								onChange={(e) => setBody(e.target.value)}
							/>
						</label>
						<label>
							<span>Tags: </span>
							<input
								type="text"
								name="url"
								value={tags}
								required
								placeholder="Insira as tags separadas por vírgulas."
								onChange={(e) => setTags(e.target.value)}
							/>
						</label>

						{!response.loading && (
							<button type="submit" className="btn">
								Editar
							</button>
						)}
						{response.loading && (
							<button type="submit" disabled className="btn">
								Aguarde...
							</button>
						)}
						{response.error && <p className="error">{response.error}</p>}
						{formError && <p className="error">{response.error}</p>}
					</form>
				</>
			)}
		</div>
	);
};

export default EditPost;
