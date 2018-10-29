import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoArticles from "../../components/NoArticles/noArticles";
import ShowArticles from "../../components/ShowArticles/showArticles";
import { removeArticle, initalLoad } from "../../actions/articleActions";
import axios from "axios";
// This is a container component, no html
// ShowArticles is a presentational component,
class Articles extends Component {
  state = {
    articleToEdit: ""
  };

  componentDidMount = () => {
    const { onLoad } = this.props;

    axios("http://localhost:8000/api/articles").then(res => {
      console.log("in componentDidMount");
      console.log(res.data);
      onLoad(res.data);
    });
  };

  // fat arrow auto binds this
  // move to the articlesform "page"
  handleAddArticle = () => this.props.history.push("/articlesform");

  handleCancelEdit = () => this.setState({ articleToEdit: "" });

  handleEditArticle = id => {
    console.log(id);
    this.setState({ articleToEdit: id });
  };

  // removeArticle is a method passed in as a prop? It is imported
  handleRemoveArticle = _id => this.props.removeArticle(_id);

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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
