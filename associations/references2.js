//this shows how we reference and ID for a specific post.

const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/blog_demo_2", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});

//creating Schemas

//posts- needs to be first if were embedding data
const postSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const Post = mongoose.model("Post", postSchema);

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

const User = mongoose.model("User", userSchema);

// this creates a user

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher",
// });

//this creates posts and pushes it to the user

// Post.create(
// 	{
// 		title: "how to Eat the best burger",
// 		content: "YUM YUM YUM",
// 	},
// 	function (err, post) {
// 		User.findOne({ _id: "5e8e57635d65e56f438a36d9" }, function (
// 			err,
// 			foundUser
// 		) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				foundUser.posts.push(post);
// 				foundUser.save(function (err, data) {
// 					if (err) {
// 						console.log(err);
// 					} else {
// 						console.log(data);
// 					}
// 				});
// 			}
// 		});
// 	}
// );

User.findOne({ _id: "5e8e57635d65e56f438a36d9" })
	.populate("posts")
	.exec(function (err, user) {
		if (err) {
			console.log(err);
		} else {
			console.log(user);
		}
	});
