const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

//MongoDb and Database
mongoose
  .connect("mongodb://localhost/yelpCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error:${err.message}`);
  });

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

//
const Campground = mongoose.model("Campground", campgroundSchema);

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
      res.render("campground", { campgroundsKey: allCampgrounds });
    }
  });
});

//req has to go before res
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  // We create a object with name and image because it eqals are name attribute on the input tags
  let newCampground = { name: name, image: image };
  //Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreaated) => {
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

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log("Yelp Camp  server has started");
});
