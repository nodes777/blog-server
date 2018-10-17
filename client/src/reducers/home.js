// home reducer handles state changes for home page
// reducers: have an accumulator and a new value, like the reduce function
// Do not put API calls into reducers

// using ES6 default to give state an empty object if no state exists
export default (state = { articles: [] }, action) => {
	switch (action.type) {
		case "HOME_PAGE_LOADED":
			// if you get the HOME_PAGE_LOADED case
			// return the current state
			// and whatever the action's data's articles are
			// and assign them to the articles array
			return {
				...state,
				articles: action.data.articles
			};
		case "SUBMIT_ARTICLE":
			return {
				...state,
				articles: [action.data.article].concat(state.articles)
			};
		case "DELETE_ARTICLE":
			return {
				...state,
				articles: state.articles.filter(
					article => article._id !== action.id
				)
			};
		case "SET_EDIT":
			return {
				...state,
				articleToEdit: action.article
			};
		case "EDIT_ARTICLE":
			return {
				...state,
				articles: state.articles.map(article => {
					if (article._id === action.data.article._id) {
						return {
							...action.data.article
						};
					}
					return article;
				}),
				articleToEdit: undefined
			};
		//default keyword specifies the code to run if there is no case match
		default:
			return state;
	}
};

// actions are objects with a type and a payload with the data to change state
// actions are created via functions called action creators
// actions are called with the dispatch method
