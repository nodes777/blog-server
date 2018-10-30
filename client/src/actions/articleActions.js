import {
	ADD_ARTICLE,
	EDIT_ARTICLE,
	UPDATE_ARTICLE,
	REMOVE_ARTICLE,
	RESET_EDIT_ARTICLE,
	INITIAL_LOAD
} from "../types";

import axios from "axios";

export const editArticle = payload => ({
	type: EDIT_ARTICLE,
	payload
});

// we have payload and history as params, but only using payload?
export const updateArticle = (payload, history) => {
	console.log("in articleActions updateArticle");
	console.log(payload);
	const { title, body, author, id } = payload;
	axios.patch(`http://localhost:8000/api/articles/${id}`, {
		title,
		body,
		author
	});
	return {
		type: UPDATE_ARTICLE,
		payload
	};
};

export const addArticle = (payload, history) => {
	const { title, body, author } = payload;
	history.push("/articles");
	// post to the server
	console.log("in addArticle");
	axios.post("http://localhost:8000/api/articles", {
		title,
		body,
		author
	});
	return {
		type: ADD_ARTICLE,
		payload
	};
};

export const removeArticle = payload => {
	console.log("in articleActions removeArticle");
	console.log(payload);
	let id = payload;
	axios.delete(`http://localhost:8000/api/articles/${id}`);
	return {
		type: REMOVE_ARTICLE,
		// payload is deconstructed in the reducer, and id is taken out,
		// the articles are filtered for id and the state is returned
		payload
	};
};

export const resetEditArticle = () => ({
	type: RESET_EDIT_ARTICLE
});

export const initalLoad = data => ({
	type: "ARTICLES_LOADED",
	payload: data.articles
});
