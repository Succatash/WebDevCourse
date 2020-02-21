const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost/cat_app");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
//adding a new cat to Db, then retrieve all cats from db
