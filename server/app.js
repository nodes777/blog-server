// node app.js to start server
// provides utilities for working with file and directory paths
const path = require("path");
// Express server framework
const express = require("express");
// Middleware to handle HTTP POST request to Express
const bodyParser = require("body-parser");
// Session middleware, data is not saved in the cookie itself, just the session ID
const session = require("express-session");
// Node package to enable CORS
const cors = require("cors");
// Development-only error handler middleware.
const errorHandler = require("errorhandler");
// MongoDB object modelling tool designed to work in async environment
const mongoose = require("mongoose");
// takes a cookie and sets max-age and encrypts, that can go to browser
// const cookieSession = require("cookie-session");

const passport = require("passport");
const keys = require("./config/keys");
const passportSetup = require("./config/passport");

// mongoose's promise system is deprecated, use node's instead
mongoose.promise = global.promise;

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// enable all middleware

let corsOptions = {
	credentials: true,
	origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// Morgan is a http request logger, log in the 'dev' format
app.use(require("morgan")("dev"));

// only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
// when false, parses the URL-encoded data with the querystring library
app.use(bodyParser.urlencoded({ extended: false }));
//only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.json());
// serves static files in the public folder
app.use(express.static(path.join(__dirname, "public")));
// https://github.com/expressjs/session
app.use(
	session({
		secret: "LightBlog",
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false
	})
);

// mongoose.connect("mongodb://localhost/lightblog");
mongoose.set("debug", true);
mongoose.connect(
	keys.mongodb.dbURI,
	() => console.log("connected to mLab")
);

app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
	app.use(errorHandler());
}

// Add models
require("./models/Articles");
// Add routes
app.use(require("./routes"));

// 404 error handler, used on all routes???
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// in dev, throw more comprehensive error
if (!isProduction) {
	app.use((err, req, res) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err
			}
		});
	});
}

// in production, throw message only
app.use((err, req, res) => {
	res.status(err.status || 500);

	res.json({
		errors: {
			message: err.message,
			error: {}
		}
	});
});

// start the server
const server = app.listen(8000, () =>
	console.log("Server started on http://localhost:8000")
);
