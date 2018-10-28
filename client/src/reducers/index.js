import map from "lodash/map";
import filter from "lodash/filter";
import { combineReducers } from "redux";
// These imports are just strings of the same name, why?
import {
	ADD_ARTICLE,
	EDIT_ARTICLE,
	UPDATE_ARTICLE,
	REMOVE_ARTICLE,
	RESET_EDIT_ARTICLE
} from "../types";
import uuid from "uuid/v1";
import moment from "moment";
import axios from "axios";

const currentDate = () =>
	moment()
		.utcOffset(-7)
		.toISOString(true);

const initialState = axios
	.get(`http://localhost:8000/api/articles`)
	.then(res => {
		console.log(res.data);
		const data = res.data;
		return data;
	});

// articles: [
// 		{
// 			id: uuid(),
// 			author: "Mr. Magoo",
// 			title: "Lorem ipsum dolor!",
// 			body:
// 				"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
// 			createdAt: currentDate()
// 		}
// 	]

const articlesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_ARTICLE:
			return {
				//why do we deconstruct state here, and again in the articles?
				// its any other parts of state we may have, and then the articles
				...state,
				articles: [
					{ id: uuid(), createdAt: currentDate(), ...payload },
					...state.articles
				]
			};
		case UPDATE_ARTICLE:
			return {
				...state,
				articles: map(
					state.articles,
					article =>
						// if the article (stored posts) match the payload id
						// replace it with the payload
						// else use the article again
						article.id === payload.id
							? { ...payload }
							: { ...article }
				)
			};
		case REMOVE_ARTICLE:
			return {
				...state,
				articles: filter(state.articles, ({ id }) => id !== payload)
			};
		// where is articleToEdit defined?
		case EDIT_ARTICLE:
			return { ...state, articleToEdit: payload };
		case RESET_EDIT_ARTICLE:
			return { ...state, articleToEdit: "" };
		default:
			return state;
	}
};

export default combineReducers({
	blog: articlesReducer
});
