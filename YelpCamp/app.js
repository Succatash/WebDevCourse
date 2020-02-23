const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

//MongoDb and Database
mongoose
  .connect("mongodb://localhost:27017/yelpCamp", {
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
  image: String,
  description: String
});

//Index route

const Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  {
    name: "Granite Hill",
    image:
      "https://images.unsplash.com/photo-1486179814561-91c2d61316b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60",
    description: "A nice Granite Mountain good for hiking!!"
  },
  (err, allCampgrounds) => {
    if (err) {
      console.log(err);
      // console.log();
    } else {
      console.log("worked");
    }
  }
);

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
//add new campground to DB
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

//NEW-show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/campgrounds:id", (req, res) => {
  //find campground with given ID
  res.send("THIS WILL BE THE SHOW PAGE ONE DAY");
});

app.listen(port, () => {
  console.log("Yelp Camp  server has started");
});
