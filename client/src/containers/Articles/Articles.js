import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoArticles from "../../components/NoArticles/noArticles";
import ShowArticles from "../../components/ShowArticles/showArticles";
import { removeArticle } from "../../actions/articleActions";

// This is a container component, no html
// ShowArticles is a presentational component,
class Articles extends Component {
  state = {
    articleToEdit: ""
  };

  componentDidMount = () => {
    console.log(this.props.articles);
  };

  // fat arrow auto binds this
  handleAddArticle = () => this.props.history.push("/articlesform");

  handleCancelEdit = () => this.setState({ articleToEdit: "" });

  handleEditArticle = () => this.setState({ articleToEdit: id });

  // removeArticle is a method passed in as a prop? It is imported
  handleRemoveArticle = () => this.props.removeArticle(id);

  render = () =>
    isEmpty(this.props.articles) ? (
      <NoArticles />
    ) : (
      <ShowArticles
        {...this.state}
        articles={this.props.articles}
        handleAddArticle={this.handleAddArticle}
        handleCancelEdit={this.handleCancelEdit}
        handleEditArticle={this.handleEditArticle}
        handleRemoveArticle={this.handleRemoveArticle}
      />
    );
}

export default connect(
  // this is same as mapStateToProps, but just inline instead of a seperate func
  state => ({ articles: state.blog.articles }),
  // this is same as mapDispatchToProps but inline
  // remove article is imported
  { removeArticle }
)(Articles);

Articles.propTypes = {
  // expect an array of objects for propTypes
  articles: PropTypes.arrayOf(PropTypes.object),
  removeArticle: PropTypes.func.isRequired
};

// const mapStateToProps = state => {
//   return {
//     articles: state.blog.articles
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return { // sample code, not valid
//     destroyTodo: () =>
//       dispatch({
//         type: 'DESTROY_TODO'
//       })
//   }
// }
