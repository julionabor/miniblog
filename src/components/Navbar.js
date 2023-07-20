import style from "./Navbar.module.css";
import logo from "../assets/spfcporto.png";
import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

import { useState } from "react";

const Navbar = () => {
	const { user } = useAuthValue();

	const { logout } = useAuthentication();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className={style.navbar}>
			<NavLink to="/" className={style.brand}>
				<img src={logo} alt="" /> São Paulo <span>Porto</span>
			</NavLink>
			<ul className={style.links_list}>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? style.active : "")}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? style.active : "")}
					>
						Sobre
					</NavLink>
				</li>
				{!user && (
					<>
						<li>
							<NavLink
								to="/login"
								className={({ isActive }) => (isActive ? style.active : "")}
							>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/register"
								className={({ isActive }) => (isActive ? style.active : "")}
							>
								Registar
							</NavLink>
						</li>
					</>
				)}
				{user && (
					<>
						<li>
							<NavLink
								to="/posts/create"
								className={({ isActive }) => (isActive ? style.active : "")}
							>
								Novo Post
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/dashboard"
								className={({ isActive }) => (isActive ? style.active : "")}
							>
								Dashboard
							</NavLink>
						</li>
					</>
				)}
				{user && <button onClick={logout}>Sair</button>}
			</ul>
			{/* Responsive menu */}

			<div className={style.navbar_response}>
				<div className={style.container + " " + style.nav_container}>
					<input
						onChange={() => setIsOpen(!isOpen)}
						className={style.checkbox}
						type="checkbox"
					/>
					<div className={style.hamburger_lines}>
						<span className={style.line + " " + style.line1}></span>
						<span className={style.line + " " + style.line2}></span>
						<span className={style.line + " " + style.line3}></span>
					</div>

					<div className={style.menu_items}>
						<ul>
							<li>
								<NavLink
									to="/"
									className={({ isActive }) => (isActive ? style.active : "")}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/about"
									className={({ isActive }) => (isActive ? style.active : "")}
								>
									Sobre
								</NavLink>
							</li>
							{!user && (
								<>
									<li>
										<NavLink
											to="/login"
											className={({ isActive }) =>
												isActive ? style.active : ""
											}
										>
											Login
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/register"
											className={({ isActive }) =>
												isActive ? style.active : ""
											}
										>
											Registar
										</NavLink>
									</li>
								</>
							)}
							{user && (
								<>
									<li>
										<NavLink
											to="/posts/create"
											className={({ isActive }) =>
												isActive ? style.active : ""
											}
										>
											Novo Post
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/dashboard"
											className={({ isActive }) =>
												isActive ? style.active : ""
											}
										>
											Dashboard
										</NavLink>
									</li>
									{user && <button onClick={logout}>Sair</button>}
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
