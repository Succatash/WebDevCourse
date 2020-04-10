const mongoose = require("mongoose");
// const Comment = require("./models/comment");

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	//embedding data comments here
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

module.exports = mongoose.model("Campground", campgroundSchema);
