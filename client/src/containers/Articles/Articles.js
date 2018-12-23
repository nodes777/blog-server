import {isEmpty, isEqual} from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, getState } from "react-redux";
import NoArticles from "../../components/NoArticles/noArticles";
import ShowArticles from "../../components/ShowArticles/showArticles";
import { removeArticle, initalLoad } from "../../actions/articleActions";
import { logInAction } from "../../actions/loginActions";
import store from "../../store"

import axios from "axios";


// This is a container component, no html
// ShowArticles is a presentational component,
class Articles extends Component {
  state = {
    articleToEdit: ""
  };

  componentDidMount = () => {
    const { onLoad, articles, loggedIn, handleLoggedIn } = this.props;
    const urlLoggedIn = this.props.match.params.id;
    // need to remove slashes from hash, then don't show up in urlLoggedIn
    console.log(this.props);

    // if its the first load, there's no articles, so make a server call, this eventually goes to mLab
    if (!articles) {
      axios("http://localhost:8000/api/articles").then(res => {
        onLoad(res.data);
      });
    }

    // Login URL Check
    if (urlLoggedIn) {
      console.log("Url is loggedIn");
      handleLoggedIn(urlLoggedIn);
    } 

  }
  // fat arrow auto binds this
  // move to the articlesform "page"
  handleAddArticle = () => this.props.history.push("/articlesform");

  handleCancelEdit = () => this.setState({ articleToEdit: "" });

  handleEditArticle = id => {
    this.setState({ articleToEdit: id });
  };

  // removeArticle is a method passed in as a prop? It is imported
  handleRemoveArticle = id => this.props.removeArticle(id);


  render = () => {
    return isEmpty(this.props.articles) ? (
      <NoArticles />
    ) : (
      <ShowArticles
        {...this.state}
        articles={this.props.articles}
        handleAddArticle={this.handleAddArticle}
        handleCancelEdit={this.handleCancelEdit}
        handleEditArticle={this.handleEditArticle}
        handleRemoveArticle={this.handleRemoveArticle}
        isLoggedIn={this.props.loggedIn}
      />
    );
  }
}

Articles.propTypes = {
  // expect an array of objects for propTypes
  articles: PropTypes.arrayOf(PropTypes.object),
  // this returns undefined when mappintDispatchToProps, but not when {removeArticle} why?
  // Because export connect needed to be below
  removeArticle: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  //handleLoggedIn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state)
  return {
    articles: state.blog.articles,
    loggedIn: state.login.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeArticle: id => {
      dispatch(removeArticle(id));
    },
    onLoad: data => {
      dispatch(initalLoad(data));
    },
    handleLoggedIn: urlLoggedIn => {
      dispatch(logInAction(urlLoggedIn));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
