import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShowForm from "../../components/ShowForm/showForm";
import { updateArticle, addArticle } from "../../actions/articleActions";

class ArticlesForm extends Component {
	state = {
		author: "",
		title: "",
		body: ""
	};

	// if this component has an id, then it's probably editting a previously created post
	// so put that into state from the props
	componentDidMount = () => {
		if (this.props.id) {
			this.setState({ ...this.props });
		}
	};

	// just go back in browser history
	handleCancelAdd = () => this.props.history.goBack();

	// on change, get the target name (ie: title), and update the state to the value inside
	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		// why get the methods from props from within the submit?
		const { addArticle, id, handleCancelEdit, updateArticle } = this.props;
		// if there's an id, then we're editting a previously created article, else its a new one
		if (id) {
			// from actions
			updateArticle(this.state);

			// clears the form and state for the form
			handleCancelEdit();
		} else {
			addArticle(this.state, this.props.history);
		}
	};

	render = () => (
		<ShowForm
			{...this.state}
			handleCancelAdd={this.handleCancelAdd}
			handleCancelEdit={this.props.handleCancelEdit}
			handleChange={this.handleChange}
			handleSubmit={this.handleSubmit}
		/>
	);
}

export default connect(
	// mapPropsToState
	null,
	// mapDispatchToProps
	{ addArticle, updateArticle }
)(ArticlesForm);

ArticlesForm.propTypes = {
	addArticle: PropTypes.func.isRequired,
	handleCancelEdit: PropTypes.func,
	updateArticle: PropTypes.func.isRequired
};
