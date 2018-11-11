import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoArticles from "../../components/NoArticles/noArticles";
import ShowArticles from "../../components/ShowArticles/showArticles";
import { removeArticle, initalLoad } from "../../actions/articleActions";
import axios from "axios";

import { handleLoggedIn } from "../../actions/loginActions";

// This is a container component, no html
// ShowArticles is a presentational component,
class Articles extends Component {
  state = {
    articleToEdit: ""
  };

  componentDidMount = () => {
    const { onLoad, articles, loggedIn } = this.props;
    const token = this.props.match.params.id;
    // need to remove slashes from hash, then don't show up in token
    console.log(token);

    // if its the first load, there's no articles, so make a server call, this eventually goes to mLab
    if (!articles) {
      axios("http://localhost:8000/api/articles").then(res => {
        onLoad(res.data);
      });
    }

    if (token) {
      console.log("Taylor is logged in");
      handleLoggedIn(token);
    }
  };

  // fat arrow auto binds this
  // move to the articlesform "page"
  handleAddArticle = () => this.props.history.push("/articlesform");

  handleCancelEdit = () => this.setState({ articleToEdit: "" });

  handleEditArticle = id => {
    this.setState({ articleToEdit: id });
  };

  // removeArticle is a method passed in as a prop? It is imported
  handleRemoveArticle = id => this.props.removeArticle(id);

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

Articles.propTypes = {
  // expect an array of objects for propTypes
  articles: PropTypes.arrayOf(PropTypes.object),
  // this returns undefined when mappintDispatchToProps, but not when {removeArticle} why?
  // Because export connect needed to be below
  removeArticle: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    articles: state.blog.articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeArticle: id => {
      console.log("in mapDispatchToProps");
      console.log(id);
      dispatch(removeArticle(id));
    },
    onLoad: data => {
      console.log("in mapDispatchToProps");
      console.log(data);
      dispatch(initalLoad(data));
    },
    handleLoggedIn: token => {
      dispatch(handleLoggedIn(token));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
