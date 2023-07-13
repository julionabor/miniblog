// import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const { createUser, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		const user = {
			displayName,
			email,
			password,
		};
		if (password !== confirmPassword) {
			setError("As passwords não coincidem!");
			return;
		}
		const res = await createUser(user);
		console.log(res);
	};
	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);
	return (
		<div className={styles.register}>
			<h1>Registe-se para postar</h1>
			<p>Crie seu utilizador e compartilhe suas histórias.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome:</span>
					<input
						type="text"
						name="displayName"
						placeholder="Nome do utilizador"
						required
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
				</label>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						placeholder="E-mail do utilizador"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type="password"
						name="password"
						placeholder="Insira a password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					<span>Confirme a Password:</span>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirme a password"
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				{!loading && 
				<button type="submit" className="btn">
					Registar
				</button> }
				{loading && (
					<button type="submit" disabled className="btn">
					Aguarde...
				</button>
				)
				}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
};

export default Register;
