const mongoose = require("mongoose");

//users
const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	//adding an array of posts for associaton, this is embedded data
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

module.exports = mongoose.model("User", userSchema);
