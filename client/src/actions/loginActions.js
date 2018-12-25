import { LOGGED_IN, LOGGED_OUT } from "../types";

export const logInAction = payload => {
	console.log("in loginActions handleLoggedIn");
	// store session token
	console.log(payload)
	return {
		type: LOGGED_IN,
		payload
	};
};

export const logOutAction = () => {
	console.log("in loginActions handleLoggingOut");
	let payload = "logout"
	return {
		type: LOGGED_OUT,
		payload
	};
};

