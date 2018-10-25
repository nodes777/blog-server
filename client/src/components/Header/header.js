import React from "react";
import { Link } from "react-router-dom";

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
			</ul>
		</nav>
	</header>
);
