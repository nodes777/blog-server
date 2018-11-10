import React from "react";
import { Link } from "react-router-dom";
// import SignInButton from "../SignIn/SignInButton.jsx";

export default () => (
	<header>
		<nav>
			<ul style={{ listStyleType: "none" }}>
				<li style={{ display: "inline", marginRight: 10 }}>
					<Link to="/">Home</Link>
				</li>
				<li style={{ display: "inline", marginRight: 10 }}>
					<Link to="/articles">Articles</Link>
				</li>
				<li style={{ display: "inline", marginRight: 10 }}>
					<a href="http://localhost:8000/auth/auth">
						Login with Google
					</a>
				</li>
			</ul>
		</nav>
	</header>
);
