# Questions

## 1) Remove Article

client/src/containers/Articles/Articles.js

Where are we actually getting removeArticle from?

import { removeArticle } from "../../actions/articleActions";

is this being passed in as a prop??
handleRemoveArticle = () => this.props.removeArticle(id);

we then pass it into connect

## 2) js or jsx?

in App.jsx I'm using jsx, but codesandbox is js. Isn't using components jsx?

## 3) Why keep a types folder of just strings?

client/src/reducers/index.js

We import actions from a folder of types, why not just keep them here?

-   Because we use them in actions too, better to import them from a single place

## 4) Why get the methods from props from within the submit?

handleSubmit = e => {
e.preventDefault();
const { addArticle, id, handleCancelEdit, updateArticle } = this.props;
if (id) {
updateArticle(this.state);
// clears the form and state for the form
handleCancelEdit();
}

## 5) We have payload and history as params, but only using payload?

client/src/actions/articleActions.js

export const updateArticle = (payload, history) => {
return {
type: UPDATE_ARTICLE,
payload
};
};

## 5) Lodash map vs native js map?

## 6) Can't mapDispatchToProps and use PropTypes?

client/src/containers/Articles/Articles.js

Articles.propTypes = {
// expect an array of objects for propTypes
articles: PropTypes.arrayOf(PropTypes.object),
// this returns undefined when mappintDispatchToProps, but not when {removeArticle} why?
//removeArticle: PropTypes.func.isRequired
};
