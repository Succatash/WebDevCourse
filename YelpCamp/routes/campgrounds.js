const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

/**
 * ==================
 * Campground Routes
 * ==================
 */

//  Index Route - shoe all campgrounds

router.get("/", (req, res) => {
	//get all campgrounds from DB, then render the file

	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
			// console.log();
		} else {
			res.render("campgrounds/index", {
				campgroundsKey: allCampgrounds
			});
		}
	});
});
//add new campground to DB

//Create Route -
router.post("/", isLoggedIn, (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	// We create a object with name and image because it eqals are name attribute on the input tags
	const author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {
		name: name,
		image: image,
		description: desc,
		author: author
	};
	//Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW-show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
	// find campground with given ID
	Campground.findById(req.params.id)
		.populate("comments")
		.exec((err, foundCampground) => {
			if (err) {
				console.log(err, "error");
			} else {
				//  render show template with that campground
				console.log(foundCampground);

				res.render("campgrounds/show", { campgrounds: foundCampground });
			}
		});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}

module.exports = router;
