import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { Route, Switch, Router } from "react-router-dom";
// Special React Redux component called <Provider> to magically make the store available to all container components in the application without passing it explicitly.
// You only need to use it once when you render the root component:
// Provider is a container component, as opposed to a presentational one
// Provider "provides" access to the store to its children
import { Provider } from "react-redux";

import store from "./store";

import { App } from "./components";

import "../resources/scss/style.scss";

ReactDOM.render(
	<Router history={createHistory()}>
		<Provider store={store}>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</Provider>
	</Router>,
	document.getElementById("root")
);
