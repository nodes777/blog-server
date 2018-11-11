import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";

// Special React Redux component called <Provider> to magically make the store available to all container components in the application without passing it explicitly.
// You only need to use it once when you render the root component:
// Provider is a container component, as opposed to a presentational one
// Provider "provides" access to the store to its children
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../reducers/reducer.js";
import Home from "../components/Home/home";
import Header from "../components/Header/header";
import Articles from "../containers/Articles/Articles";
import ArticlesForm from "../containers/ArticlesForm/ArticlesForm";
import GoogleAuth from "../components/GoogleAuth/GoogleAuth";

const store = createStore(rootReducer);

// is this js or jsx? sandbox has it as js but...
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={createHistory()}>
					<div>
						<Header />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/articles/:id" component={Articles} />

							<Route path="/articles" component={Articles} />

							<Route
								path="/articlesform"
								component={ArticlesForm}
							/>
							<Route path="/auth" component={GoogleAuth} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
