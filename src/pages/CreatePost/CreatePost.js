import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import styles from "./CreatePost.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState(""); //imgURL
	const [progress, setProgress] = useState(0);
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState("");

	const { user } = useAuthValue();

	const { insertDocument, response } = useInsertDocument("posts");

	const navigate = useNavigate();

	const handleUpload = (e) => {
		e.preventDefault();
		const file = e.target?.files[0];
		
		if (!file) return;

		const storageRef = ref(storage, `images/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progress);
			},
			(error) => {
				console.error(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setImage(url);
				});
			}
		);
	};

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
		insertDocument({
			title,
			image,
			body,
			tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		});
		// redirect
		navigate("/");
	};
	return (
		<div className={styles.create_post}>
			<h2>Crie seu novo Post</h2>
			<p>Escreva sobre o que gostaria de partilhar!</p>
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
					<span>Carregar Foto: </span>
					
						<input type="file" onChange={handleUpload} />
						<progress value={progress} max="100" />
						{/* <button type="submit" >Carregar Imagem</button> */}
					
				</label>
				<label>
					<span>Imagem carregada:</span>
					{image && <img src={image} alt="" />}
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
						Criar Post
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
		</div>
	);
};

export default CreatePost;
