//this shows how to associate users and posts

const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/blog_demo", {
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
	posts: [postSchema],
});

const User = mongoose.model("User", userSchema);

//creating users and posts
// const newUser = new User({
// 	email: "Marla.Stein@goodcook.com",
// 	name: "Marla Stein",
// });

// newUser.posts.push({
// 	title: "How to brew a potion",
// 	content: "JK, go to class",
// });

// newUser.save((err, user) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// const newPost = new Post({
// 	title: "peaches",
// 	content: "creams come from a tree",
// });

// newPost.save(function (err, post) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne(
	{
		name: "Marla Stein",
	},
	function (err, user) {
		if (err) {
			console.log(err);
		} else {
			user.posts.push({
				title: "Three thigns I hate",
				content: "harry, harry, harry",
			});

			//this is considered callback hell, what KOA tries to fix
			//we get the user info first then run .save callback
			user.save((err, user1) => {
				if (err) {
					console.log(err);
				} else {
					console.log(user1);
				}
			});
		}
	}
);
