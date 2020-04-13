const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// const User = new Schema({});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
