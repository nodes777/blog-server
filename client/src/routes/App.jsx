import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";

// Special React Redux component called <Provider> to magically make the store available to all container components in the application without passing it explicitly.
// You only need to use it once when you render the root component:
// Provider is a container component, as opposed to a presentational one
// Provider "provides" access to the store to its children
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../reducers";
import Home from "../components/Home/home";
import Header from "../components/Header/header";
// import Articles from "../containers/Articles/Articles";
// import ArticlesForm from "../containers/ArticlesForm/ArticlesForm";

const store = createStore(rootReducer);

// is this js or jsx? sandbox has it as js but...
export default () => (
	<Provider store={store}>
		<Router history={createHistory()}>
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					{/*<Route path="/articles" component={Articles} />
					<Route path="/articlesform" component={ArticlesForm} />*/}
				</Switch>
			</div>
		</Router>
	</Provider>
);
