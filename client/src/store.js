// The state of the whole application is stored in an object tree in a single store
// A store is an object that holds the application's state tree.

import { createStore, combineReducers } from "redux";

// reducers are pure functions that take the previous state and an action
// reducers return the next state
import reducers  from "./reducers/reducer.js";
//console.log(reducers)
const rootReducer = combineReducers({
	reducers
});

// The store is made of the reducers
const store = createStore(rootReducer);

export default store;

