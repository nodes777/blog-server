import { LOGGED_IN } from "../types";

export const handleLoggedIn = payload => {
	console.log("in loginActions handleLoggedIn");
	console.log(payload);
	const token = payload;
	// store session token
	return {
		type: LOGGED_IN,
		payload
	};
};
