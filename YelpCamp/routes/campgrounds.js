const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, (req, res) => {
	let name = req.body.name;
	let price = req.body.price;
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
		price: price,
		description: desc,
		author: author
	};
	//Create a new campground and save to DB
	Campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW-show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
	// find campground with given ID
	Campground.findById(req.params.id)
		.populate("comments")
		.exec(function (err, foundCampground) {
			if (err) {
				console.log(err, "error");
			} else {
				//  render show template with that campground
				console.log(foundCampground);

				res.render("campgrounds/show", { campgrounds: foundCampground });
			}
		});
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (
	req,
	res
) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		res.render("campgrounds/edit", { campgrounds: foundCampground });
	});
});

// Update
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, function (
		err,
		updatedCampground
	) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
		if (err) {
			console.log(err);
		}
		Comment.deleteMany({ _id: { $in: campgroundRemoved.comments } }, (err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/campgrounds");
		});
	});
});

module.exports = router;
