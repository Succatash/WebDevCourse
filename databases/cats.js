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
  temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

//adding a new cat to Db,

//this is a 2 step process added then saved

// let george = new Cat({ name: "Mrs. Norris", age: 7, tempermeant: "Evil" });

// george.save(
//   //callback function, normal pattern for mongoose
//   function callback(err, cat) {
//     if (err) {
//       console.log("something went wrong");
//     } else {
//       console.log("We Just Saved The Cats to the DB");
//       console.log(cat);
//     }
//   }
// );

//another way to create, this merges the 2 from above first creating, then a callback function to let us know that it worked
Cat.create(
  {
    name: "Snow White",
    age: 15,
    temperament: "Bland"
  },
  (err, cat) => {
    if (err) {
      console.log("something went wrong");
    } else {
      console.log("We Just Saved The Cats to the DB");
      console.log(cat);
    }
  }
);

// retrieve all cats from db
Cat.find({}, (err, cats) => {
  if (err) {
    console.log("OHH NOO");
    console.log(err);
  } else {
    console.log(cats);
    console.log("All The Cats.....");
  }
});
