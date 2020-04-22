const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareOBJ = {};

middlewareOBJ.checkCampgroundOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, foundCampground) {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged In");
		res.redirect("back");
	}
};

middlewareOBJ.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged In");
		res.redirect("back");
	}
};

middlewareOBJ.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
};

module.exports = middlewareOBJ;
