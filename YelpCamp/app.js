const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

let campgroundsValue = [
  {
    name: " Salmon_Creek",
    image:
      "https://pixabay.com/get/57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: "Big Bobs",
    image:
      "https://pixabay.com/get/52e8d4404253ab14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },

  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/55e4d5454b51ab14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: "Mountain Goats Rest",
    image:
      "https://pixabay.com/get/55e7d24a485aac14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: "Big Bobs",
    image:
      "https://pixabay.com/get/52e8d4404253ab14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: " Salmon_Creek",
    image:
      "https://pixabay.com/get/57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: "Big Bobs",
    image:
      "https://pixabay.com/get/52e8d4404253ab14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },
  {
    name: "Mountain Goats Rest",
    image:
      "https://pixabay.com/get/55e7d24a485aac14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  },

  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/55e4d5454b51ab14f6da8c7dda793f7f1636dfe2564c704c7d2e7bd79749c451_340.jpg"
  }
];

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campground", { campgroundsKey: campgroundsValue });
});

//req has to go before res
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  // We create a object with name and image because it eqals are name attribute on the input tags
  let newCampground = { name: name, image: image };
  campgroundsValue.push(newCampground);
  // /camogrounds is a GET instead of the post above
  res.redirect("/campgrounds");
});
//get data from form and add to campgrounds array
//redirect back to campgrounds

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log("Yelp Camp  server has started");
});
