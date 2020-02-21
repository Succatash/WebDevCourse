const express = require("express");
const app = express();
const port = 3000;
// tells express to serve the contents of the public directory
app.use(express.static("public"));
//request = req, response = res
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home.ejs");
});

app.get("/ilove/:thing", function(req, resp) {
  //let thing = req.params.thing;
  resp.render("love", { thing: req.params.thing });
});

app.get("/posts", (reg, resp) => {
  let post = [
    { title: "Post 1", author: "Eric" },

    {
      title: "I am the greatest poster in the history of all histories",
      author: "Bobby"
    },
    { title: "Post 3", author: "Colt" },
    { title: "This is a great title", author: "Bill De Blasio" },
    { title: "Whats for dinner", author: "breezy" }
  ];
  // posts: refers to the name inside the template posts: posts <-- refers to the name of the variable in the app.get
  resp.render("posts", { posts: post });
});

app.listen(port, () => {
  console.log("Example app listening on port 3000");
});
