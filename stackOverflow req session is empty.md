I have a MERN stack blog app that I'm making as a learning exercise. I'm relatively comfortable on the front end but have limited experience in node. I'm adding authentification after following a couple tutorials to get this far. I'm using passport.js as a framework to make a request to Google, get back an id and save as session info. However, after logging in, req.session is empty when making a post request, even though I can see a cookie in the dev tools.

I'm using bcrypt's hash to obscure the actual id, but that may not be best practice.

in blogAuth.js: req.session is defined.

`bcrypt.hash(req.user._id.toString(), saltRounds, function(err, hash) { req.session.user = hash; //session is set here. console.log(req.session); res.redirect(`http://localhost:8080/articles/loggedIn`);
});`

but in api/articles.js: req.session is empty

`router.post("/", (req, res, next) => { const { body } = req; // session is empty here. Why? console.log(`Session user, ${req.session.user}`); console.log(req.session);`

I have tried:

-   Including proxy in the client package.json:
    https://stackoverflow.com/questions/51803692/express-req-session-empty-with-cookie-session

    using withCredentials set to true when sending the POST from the
    client:https://stackoverflow.com/questions/16434893/node-express-passport-req-user-undefined?noredirect=1&lq=1

    Rearranging the order of middleware: Routes must always come
    afterward, but I feel like I'm doing this blindly and it usually results in an error

Here's some of the relevant files:
Server side:
[app.js](https://github.com/nodes777/blog-server/blob/betterorg/server/app.js)
[blogAuth.js](https://github.com/nodes777/blog-server/blob/betterorg/server/routes/auth/blogAuth.js)
[passport.js](https://github.com/nodes777/blog-server/blob/betterorg/server/config/passport.js)
[api/articles.js](https://github.com/nodes777/blog-server/blob/betterorg/server/routes/api/articles.js)

Client side:
[the POST req](https://github.com/nodes777/blog-server/blob/betterorg/client/src/containers/ArticlesForm/ArticlesForm.js)

[Entire project](https://github.com/nodes777/blog-server/tree/betterorg)

I believe this is an issue with ordering. What is a good way to ensure that I order my middleware correctly? Or if the order looks correct, where else could this issue becoming from?



# Answer:
I was using cookieSession and session and they overwrite each other.
