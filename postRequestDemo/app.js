const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
//global friend variable eventually we use a DB
let friends = ["Matthew", "Eric", "Breezy", "Bobby", "Marcus"];

app.get("/", (req, resp) => {
  resp.render("home");
});

app.get("/friends", (req, resp) => {
  resp.render("friends", { friends: friends });
});

//using body-parser to parse the form
app.post("/addfriend", (req, resp) => {
  const newFriend = req.body.newFriend;
  friends.push(newFriend);
  console.log(newFriend);
  resp.redirect("/friends");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
