const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define a schema for an article
const UserSchema = new Schema(
	{
		username: String,
		googleId: String
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
