const mongoose = require("mongoose");

// Everything is derived from a Schema
const { Schema } = mongoose;

// Define a schema for an article
const ArticlesSchema = new Schema(
	{
		title: String,
		body: String,
		author: String
	},
	{ timestamps: true }
);

// methods must be added before compiling
ArticlesSchema.methods.toJSON = function() {
	return {
		// Mongoose assigns an _id field by default if one is not passed into the Schema constructor
		id: this._id,
		title: this.title,
		body: this.body,
		author: this.author,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};
};

// Compile schema into a model
// A model is a class with we construct documents
// Each document will be an article with  properties from the schema
mongoose.model("Articles", ArticlesSchema);
