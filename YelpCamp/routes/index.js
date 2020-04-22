const express = require("express");
const router = express.Router();

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
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function () {
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
	res.redirect("/");
});

/**
 * MiddleWare Functions
 */

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}

module.exports = router;
