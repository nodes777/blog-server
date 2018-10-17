import React from "react";
import axios from "axios";
// date parsing library
import moment from "moment";

import { connect } from "react-redux";

import { Form } from "../../components/Article";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		// onLoad is coming from... mapDispatchToProps
		// which fires first because of connect() before component is loaded
		const { onLoad } = this.props;

		axios("http://localhost:8000/api/articles").then(res =>
			onLoad(res.data)
		);
	}

	handleDelete(id) {
		const { onDelete } = this.props;

		return axios
			.delete(`http://localhost:8000/api/articles/${id}`)
			.then(() => onDelete(id));
	}

	handleEdit(article) {
		const { setEdit } = this.props;

		setEdit(article);
	}

	render() {
		const { articles } = this.props;

		return (
			<div className="container">
				<div className="row pt-5">
					<div className="col-12 col-lg-6 offset-lg-3">
						<h1 className="text-center">LightBlog</h1>
					</div>
					<Form />
				</div>
				<div className="row pt-5">
					<div className="col-12 col-lg-6 offset-lg-3">
						{articles.map(article => {
							return (
								<div key={article._id} className="card my-3">
									<div className="card-header">
										{article.title}
									</div>
									<div className="card-body">
										{article.body}
										<p className="mt-5 text-muted">
											<b>{article.author}</b>{" "}
											{moment(
												new Date(article.createdAt)
											).fromNow()}
										</p>
									</div>
									<div className="card-footer">
										<div className="row">
											<button
												className="btn btn-primary mx-3"
												onClick={() =>
													this.handleEdit(article)
												}
											>
												Edit
											</button>
											<button
												className="btn btn-danger"
												onClick={() =>
													this.handleDelete(
														article._id
													)
												}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

// the store's state object
const mapStateToProps = state => ({
	articles: state.home.articles
});

// function with the dispatch function as a param
// onLoad should take the data, run dispatch, which talks to the store
// then dispatch returns an object
const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data }),
	onDelete: id => dispatch({ type: "DELETE_ARTICLE", id }),
	setEdit: article => dispatch({ type: "SET_EDIT", article })
});

// connect returns a higher order component so it
// must be invoked again with a React component
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
