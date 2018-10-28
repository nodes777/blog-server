import map from "lodash/map";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ArticlesForm from "../../containers/ArticlesForm/ArticlesForm";

const ShowArticles = ({
	articles,
	articleToEdit,
	handleAddArticle,
	handleCancelEdit,
	handleEditArticle,
	handleRemoveArticle
}) => (
	<div className="col-12 col-lg-6 offset-lg-3">
		<div style={{ width: 200, margin: "0 auto" }}>
			<button
				style={{ width: 200 }}
				className="btn btn-primary mx-3"
				onClick={handleAddArticle}
			>
				Add Article
			</button>
		</div>
		{map(
			articles,
			({ id, author, body, createdAt, title }) =>
				articleToEdit === id ? (
					<ArticlesForm
						key={id}
						handleCancelEdit={handleCancelEdit}
						id={id}
						author={author}
						body={body}
						title={title}
					/>
				) : (
					// refactor this into its own component
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
				)
		)}
	</div>
);

export default ShowArticles;

ShowArticles.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object),
	articleToEdit: PropTypes.string,
	handleAddArticle: PropTypes.func,
	handleCancelEdit: PropTypes.func,
	handleEditArticle: PropTypes.func,
	handleRemoveArticle: PropTypes.func
};
