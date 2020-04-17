const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	Campgrounds = require("./models/campground");
(Comment = require("./models/comment")), (User = require("./models/user"));
seedDB = require("./seeds");
// passportLocalMongoose = require("passport-local-mogoose");

const commentsRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

seedDB();

//MongoDb and Database
mongoose
	.connect("mongodb://localhost:27017/yelpCamp", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("DB Connected!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});
// seedDB();
const port = 3000;

/**
 * Passport Configuration
 */

app.use(
	require("express-session")({
		secret: "Maximus is my dog",
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

//this provides middleware to every route
app.use(function (req, res, next) {
	res.locals, (currentUser = req.user);
	next();
});

//requiring the routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(port, () => {
	console.log("Yelp Camp  server has started");
});
