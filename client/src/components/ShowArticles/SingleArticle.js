import React, { Component } from "react";
import moment from "moment";

class SingleArticle extends Component {
	render() {
		const {
			id,
			title,
			body,
			author,
			createdAt,
			handleRemoveArticle
		} = this.props;
		return (
			<div key={id} className="card my-3">
				<div className="card-header">{title}</div>
				<div className="card-body">
					{body}
					<p className="mt-5 text-muted">
						{"posted by"} <b>{author}</b> (
						{moment(createdAt).fromNow()})
					</p>
				</div>
				<div className="card-footer">
					<div className="row">
						<button
							className="btn btn-primary mx-3"
							onClick={() => handleEditArticle(id)}
						>
							Edit
						</button>
						<button
							className="btn btn-danger"
							onClick={() => handleRemoveArticle(id)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleArticle;
