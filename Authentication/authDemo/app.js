const express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	ejs = require("ejs"),
	bodyParser = require("body-parser"),
	User = require("./models/user");

(app = express()), (port = 3000);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//MongoDb and Database
mongoose
	.connect("mongodb://localhost/auth_demo_app", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});

// Routes
app.get("/", function (req, res) {
	res.render("home");
});

app.get("/secret", function (req, res) {
	res.render("secret");
});

app.listen(port, function () {
	console.log("server started");
});
