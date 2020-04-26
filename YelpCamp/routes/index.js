const express = require("express"),
	router = express.Router(),
	middleware = require("../middleware");
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
	res.render("landing");
});

/**
 * ===========
 * Authorization Routes
 * ============
 */

router.get("/register", function (req, res) {
	res.render("register");
});

/**
 * Sign up logic
 */

router.post("/register", function (req, res) {
	const newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash("error", err.message);
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "Welcome to Yelpcamp");
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function (req, res) {
	res.render("login");
});

/**
 * Handling login logic
 */

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),
	function (req, res) {}
);

/**
 * Logout route
 */

router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Logged Out");
	res.redirect("/campgrounds");
});

module.exports = router;
