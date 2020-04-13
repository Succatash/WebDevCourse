const express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	localStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	ejs = require("ejs"),
	app = express();

//MongoDb and Database
mongoose
	.connect("mongodb://localhost/authDemo", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected for Auth!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});
port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	require("express-session")({
		secret: "Maximus is my dog",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Routes
 */
app.get("/", function (req, res) {
	res.render("home");
});

app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

//Auth Routes

app.get("/register", function (req, res) {
	res.render("register");
});

//handling user sign up
app.post("/register", function (req, res) {
	req.body.username;
	req.body.password;
	User.register(
		new User({ username: req.body.username }),
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function () {
				res.redirect("/secret");
			});
		}
	);
});

//login routes
app.get("/login", function (req, res) {
	res.render("login");
});

//middleware runs in the middle of our routes
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login",
	}),
	function (req, res) {}
);

app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/");
	}
}

app.listen(port, function () {
	console.log("server started......");
});
