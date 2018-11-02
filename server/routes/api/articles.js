// index.js in /api and /api/routes end up here
const mongoose = require("mongoose");
const router = require("express").Router();
// get the Article model from mongoose
const Articles = mongoose.model("Articles");

// POST to localhost:8000/api/articles/
/* expects an object like this:
{
	"title": "Test title",
	"author": "Taylor",
	"description": "Test desc", // shouldn't this be body?
}
*/
router.post("/", (req, res, next) => {
	// get the body from the request
	const { body } = req;

	// return error if submitted without a title/author/body
	if (!body.title) {
		return res.status(422).json({
			errors: {
				title: "is required"
			}
		});
	}

	if (!body.author) {
		return res.status(422).json({
			errors: {
				author: "is required"
			}
		});
	}

	if (!body.body) {
		return res.status(422).json({
			errors: {
				body: "is required"
			}
		});
	}

	// create a new object from the Articles model
	const finalArticle = new Articles(body);

	// save the article to the database
	return (
		finalArticle
			.save()
			// return a response of JSON with the article's info as JSON
			.then(() => res.json({ article: finalArticle.toJSON() }))
			.catch(next)
	);
});

// on get request for the /articles page
router.get("/", (req, res, next) => {
	// get all articles
	return (
		Articles.find()
			// sort descending by newest first
			.sort({ createdAt: "descending" })
			// with that articles array, respond with a json object of articles,
			// which has a property of an array of articles
			.then(articles =>
				res.json({
					articles: articles.map(article => article.toJSON())
				})
			)
			.catch(next)
	);
});

// creates id middleware for when an id is passed into a url
router.param("id", (req, res, next, id) => {
	// Finds a single document by its _id field
	return Articles.findById(id, (err, article) => {
		if (err) {
			return res.sendStatus(404);
		} else if (article) {
			// assign the response article the found article, then next()
			req.article = article;
			return next();
		}
	}).catch(next);
});

// returns a specific article
router.get("/:id", (req, res, next) => {
	return res.json({
		article: req.article.toJSON()
	});
});

// PATCH applies partial modifications to a resource, PUT replaces entire resource
router.patch("/:id", (req, res, next) => {
	const { body } = req;

	// if the req.body.title is not undefined
	if (typeof body.title !== "undefined") {
		// reassign the current article title to the one sent in the request
		req.article.title = body.title;
	}

	if (typeof body.author !== "undefined") {
		req.article.author = body.author;
	}

	if (typeof body.body !== "undefined") {
		req.article.body = body.body;
	}

	// save the changes to the db
	return (
		req.article
			.save()
			// responde with the updated changes in json
			.then(() => res.json({ article: req.article.toJSON() }))
			.catch(next)
	);
});

// DELETE a resource by id
router.delete("/:id", (req, res, next) => {
	return Articles.findByIdAndRemove(req.article.id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;
