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

-   Because we use them in actions and reducers too, better to import them from a single place

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

### Former Problem

In Articles.js, I'm doing componentDidMount() which loads the articles from the axios call to the server. This might not have the newly added article. So the articles are rendered without the newly added one.

Solution: Check if articles exist in props yet. If not you need inital load, otherwise you already have them and can just render.

### CORS Problem

I was getting a CORS error when trying to send the initial call to Google+ API.

Soluton: use a link element in html instead of doing componentDidMount, not sure why I was doing that anyway

https://stackoverflow.com/questions/42002777/cors-facebook-passport

### Google Redirect Problem

Couldnt get find the redirect route after Google sent back token.

Solution: I wasnt aware of the way the index.js routing was working

api/auth/google/redirect etc

became

auth/auth/google/redirect

Had to make sure these all lined up in config/passport.js and Google console and in router
