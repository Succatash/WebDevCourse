//this shows how we reference and ID for a specific post.
const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/users");

mongoose
	.connect("mongodb://localhost/blog_demo_2", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});

// this creates a user

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher",
// });

// this creates posts and pushes it to the user

Post.create(
	{
		title: "how to Eat the best burger",
		content: "YUM YUM YUM",
	},
	function (err, post) {
		User.findOne({ email: "bob@gmail.com" }, function (err, foundUser) {
			if (err) {
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save(function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
	}
);

// User.findOne({ _id: "5e8e57635d65e56f438a36d9" })
// 	.populate("posts")
// 	.exec(function (err, user) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(user);
// 		}
// 	});
