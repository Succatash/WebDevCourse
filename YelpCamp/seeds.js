const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [
	{
		name: "Cloud's Rest",
		image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id: "5e96777eee21a37b60ea39fb",
			username: "1"
		}
	},
	{
		name: "Desert Mesa",
		image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id: "5e96777eee21a37b60ea39fb",
			username: "1"
		}
	},
	{
		name: "Canyon Floor",
		image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id: "5e96777eee21a37b60ea39fb",
			username: "1"
		}
	}
];

async function seedDB() {
	//Remove all campgrounds
	await Comment.deleteMany({});
	console.log("camground removed");

	await Campground.deleteMany({});
	console.log("comments removed");

	//loop thru seeds
	for (const seed of seeds) {
		let campground = await Campground.create(seed);
		console.log("campground created");
		let comment = await Comment.create({
			text: "This place is great, but I wish there was internet",
			author: "homer"
		});
		//push comment to campground
		console.log("comment created");
		campground.comments.push(comment);
		//save campground
		campground.save();
		console.log("Comment added to campground");
	}
}
module.exports = seedDB;
