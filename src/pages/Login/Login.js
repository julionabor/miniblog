// import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Login.module.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		const user = {
			email,
			password,
		};

		const res = await login(user);
		console.log(res);
	};
	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);
	return (
		<div className={styles.login}>
			<h1>Entrar</h1>
			<p>Efectue o login para poder utilizar o sistema.</p>
			<form onSubmit={handleSubmit}>
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

				{!loading && (
					<button type="submit" className="btn">
						Entrar
					</button>
				)}
				{loading && (
					<button type="submit" disabled className="btn">
						Aguarde...
					</button>
				)}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
};

export default Login;
