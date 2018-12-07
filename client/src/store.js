// The state of the whole application is stored in an object tree in a single store
// A store is an object that holds the application's state tree.

import { createStore, combineReducers } from "redux";

// reducers are pure functions that take the previous state and an action
// reducers return the next state
import { index } from "./reducers/reducers.js";
console.log(index)
const reducers = combineReducers({
	index
});

// The store is made of the reducers
const store = createStore(reducers);

export default store;

