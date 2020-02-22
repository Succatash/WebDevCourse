const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/cat_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error:${err.message}`);
  });

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   // we're connected!
// });

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  tempermeant: String
});

const Cat = mongoose.model("Cat", catSchema);

let george = new Cat({ name: "george", age: 11, tempermeant: "grouchy" });

george.save(
  //callback function
  (err, cat) => {
    if (err) {
      console.log("something went wrong");
    } else {
      console.log("We Just Save The Cates");
      console.log(cat);
    }
  }
);
//adding a new cat to Db, then retrieve all cats from db

// app.listen(port, () => {
//   console.log("Example app listening on port 3000");
// });
