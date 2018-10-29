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
	return {
		type: UPDATE_ARTICLE,
		payload
	};
};

export const addArticle = (payload, history) => {
	const { title, body, author } = payload;
	history.push("/articles");
	// post to the server
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

export const removeArticle = payload => ({
	type: REMOVE_ARTICLE,
	// payload is deconstructed in the reducer, and id is taken out,
	// the articles are filtered for id and the state is returned
	payload
});

export const resetEditArticle = () => ({
	type: RESET_EDIT_ARTICLE
});

export const initalLoad = data => ({
	type: "ARTICLES_LOADED",
	payload: data.articles
});

// export const initalLoad = () => {
// 	return axios
// 		.get(`http://localhost:8000/api/articles`)
// 		.then(res => {
// 			const data = res.data;
// 			return data;
// 		})
// 		.then(articles => {
// 			console.log("initalLoad Complete: " + articles);
// 			return {
// 				type: INITIAL_LOAD,
// 				payload: articles
// 			};
// 		});
// };
