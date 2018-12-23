import map from "lodash/map";
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ArticlesForm from "../../containers/ArticlesForm/ArticlesForm";
import SingleArticle from "../../components/ShowArticles/SingleArticle";
import AddArticleButton from "../../components/ShowArticles/AddArticleButton";

class ShowArticles extends Component {
	render() {
		const {
			handleAddArticle,
			handleEditArticle,
			handleCancelEdit,
			handleRemoveArticle,
			articles,
			articleToEdit,
			isLoggedIn
		} = this.props;
		console.log(`isLoggedIn: ${isLoggedIn}`)
		console.log(isLoggedIn)
		let addArticleButton;
		if (isLoggedIn) {
		      addArticleButton = <AddArticleButton onClick={handleAddArticle} />;
		    } else {
		      addArticleButton = <div></div>;
		    }
		return (
				<div className="col-12 col-lg-6 offset-lg-3">
				{addArticleButton}
				{map(articles, ({ id, author, body, createdAt, title }) => {
					// let id = id;
					if (articleToEdit === id) {
						return (
							<ArticlesForm
								key={id}
								handleCancelEdit={handleCancelEdit}
								id={id}
								author={author}
								body={body}
								title={title}
								className={"m-4"}
							/>
						);
					} else {
						return (
							<SingleArticle
								key={id}
								id={id}
								author={author}
								body={body}
								title={title}
								handleRemoveArticle={handleRemoveArticle}
								handleEditArticle={handleEditArticle}
								isLoggedIn={isLoggedIn}
							/>
						);
					}
				})}
			</div>
		);
	}
}

export default ShowArticles;

ShowArticles.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object),
	articleToEdit: PropTypes.string,
	handleAddArticle: PropTypes.func,
	handleCancelEdit: PropTypes.func,
	handleEditArticle: PropTypes.func,
	handleRemoveArticle: PropTypes.func
};
