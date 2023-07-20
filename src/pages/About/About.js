import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				Sobre o São Paulo <span>Porto</span>
			</h2>
			<p>
				São Paulo Porto é um grupo de torcedores São Paulinos apaixonados
				pelo seu clube que vivem em Portugal e se juntam para falar e acompanhar o time de coração.
				Este blog foi feito com intuito de todos poderem contribuir e escrever artigos sobre a historia do São Paulo
			</p>
			<Link to="/posts/create" className="btn">
				Criar Post
			</Link>
		</div>
	);
};

export default About;
