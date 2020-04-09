const mongoose = require("mongoose");

//posts- needs to be first if were embedding data
const postSchema = new mongoose.Schema({
	title: String,
	content: String,
});

module.exports = mongoose.model("Post", postSchema);
