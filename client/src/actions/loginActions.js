import { LOGGED_IN } from "../types";

export const logInAction = payload => {
	console.log("in loginActions handleLoggedIn");
	// store session token
	console.log(payload)
	return {
		type: LOGGED_IN,
		payload
	};
};
