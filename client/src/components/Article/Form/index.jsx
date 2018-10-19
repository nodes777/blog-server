import axios from "axios";
import React from "react";
import { connect } from "react-redux";

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			body: "",
			author: ""
		};

		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// if editting an article, return the new information as an object
	// This indicates that state has changed, and componentDidUpdate will fire
	// Can't use this.setState in here, so must go to componentDidUpdate
	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps);
		console.log(prevState);
		if (
			JSON.stringify(nextProps.articleToEdit) !==
			JSON.stringify(prevState)
		) {
			console.log("returning new state");
			console.log(nextProps);
			console.log(prevState);
			return {
				title: prevState.title,
				body: prevState.body,
				author: prevState.author
			}; // <- this is setState equivalent
		} else {
			return null;
		}
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	// infinite loop with prevProps
	// 	// no updates with prevState because the setState never fires
	// 	if (
	// 		prevProps.title !== this.state.title ||
	// 		prevProps.body !== this.state.body ||
	// 		prevProps.author !== this.state.author
	// 	) {
	// 		console.log(prevState);
	// 		console.log(this.state);
	// 		console.log(prevProps);
	// 		this.setState({
	// 			title: this.state.title,
	// 			body: this.state.body,
	// 			author: this.state.author
	// 		});
	// 		//this.classMethod();
	// 		//debugger;
	// 	}
	// 	console.log(this.state);
	// }
	/* This is deprecated, covered by the above two methods
	componentWillReceiveProps(nextProps) {
		console.log(this);
		if (nextProps.articleToEdit) {
			this.setState({
				title: nextProps.articleToEdit.title,
				body: nextProps.articleToEdit.body,
				author: nextProps.articleToEdit.author
			});
		}
	}
	*/

	handleSubmit() {
		const { onSubmit, articleToEdit, onEdit } = this.props;
		const { title, body, author } = this.state;

		if (!articleToEdit) {
			return axios
				.post("http://localhost:8000/api/articles", {
					title,
					body,
					author
				})
				.then(res => onSubmit(res.data))
				.then(() => this.setState({ title: "", body: "", author: "" }));
		} else {
			return axios
				.patch(
					`http://localhost:8000/api/articles/${articleToEdit._id}`,
					{
						title,
						body,
						author
					}
				)
				.then(res => onEdit(res.data))
				.then(() => this.setState({ title: "", body: "", author: "" }));
		}
	}

	handleChangeField(key, event) {
		this.setState({
			[key]: event.target.value
		});
	}

	render() {
		const { articleToEdit } = this.props;
		const { title, body, author } = this.state;

		return (
			<div className="col-12 col-lg-6 offset-lg-3">
				<input
					onChange={ev => this.handleChangeField("title", ev)}
					value={title}
					className="form-control my-3"
					placeholder="Article Title"
				/>
				<textarea
					onChange={ev => this.handleChangeField("body", ev)}
					className="form-control my-3"
					placeholder="Article Body"
					value={body}
				/>
				<input
					onChange={ev => this.handleChangeField("author", ev)}
					value={author}
					className="form-control my-3"
					placeholder="Article Author"
				/>
				<button
					onClick={this.handleSubmit}
					className="btn btn-primary float-right"
				>
					{articleToEdit ? "Update" : "Submit"}
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onSubmit: data => dispatch({ type: "SUBMIT_ARTICLE", data }),
	onEdit: data => dispatch({ type: "EDIT_ARTICLE", data })
});

const mapStateToProps = state => ({
	articleToEdit: state.home.articleToEdit
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);
