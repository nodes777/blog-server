import React from "react";
import axios from "axios";

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

	//dynamically set state based on what was passed in as the key
	handleChangeField(key, event) {
		this.setState({
			[key]: event.target.value
		});
	}

	handleSubmit() {
		// extract properties from state
		const { title, body, author } = this.state;

		// make a POST request to the api url
		// Update this URL later???
		return axios.post("http://localhost:8000/api/articles", {
			title,
			body,
			author
		});
	}

	render() {
		const { title, body, author } = this.state;
		return (
			<div className="col-12 col-lg-6 offset-lg-3">
				<input
					onChange={event => this.handleChangeField("title", event)}
					value={title}
					type="text"
					placeholder="Article Title"
					className="form-control my-3"
				/>
				<textarea
					onChange={ev => this.handleChangeField("body", ev)}
					placeholder="Article Body"
					className="form-control my-3"
					placeholder="Article Description"
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
					Submit
				</button>
			</div>
		);
	}
}

export default Form;
