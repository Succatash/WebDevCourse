const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds"),
	Comment = require("./models/comment");

// seedDB();
//MongoDb and Database
mongoose
	.connect("mongodb://localhost:27017/yelpCamp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected!"))
	.catch((err) => {
		console.log(`DB Connection Error:${err.message}`);
	});

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

seedDB();
// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://images.unsplash.com/photo-1486179814561-91c2d61316b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60",
//     description: "A nice Granite Mountain good for hiking!!"
//   },C
//   (err, allCampgrounds) => {
//     if (err) {
//       console.log(err);
//       // console.log();
//     } else {
//       console.log("worked");
//     }
//   }
// );

app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	//get all campgrounds from DB, then render the file

	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
			// console.log();
		} else {
			res.render("index", { campgroundsKey: allCampgrounds });
		}
	});
});
//add new campground to DB
//req has to go before res
app.post("/campgrounds", (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	// We create a object with name and image because it eqals are name attribute on the input tags
	let newCampground = { name: name, image: image, description: description };
	//Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});

	// /camogrounds is a GET instead of the post above
});

//get data from form and add to campgrounds array
//redirect back to campgrounds

//NEW-show form to create new campground
app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
	// find campground with given ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
			console.log("error");
		} else {
			//  render show template with that campground
			res.render("show", { campgrounds: foundCampground });
		}
	});
});

app.listen(port, () => {
	console.log("Yelp Camp  server has started");
});
