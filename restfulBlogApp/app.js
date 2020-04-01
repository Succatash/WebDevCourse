import express, { static } from "express";
bodyParser = require("body-parser");
mongoose = require("mongoose");
methodOverride = require("method-override");
ejs = require("ejs");
app = express();

const port = 3000;
//MongoDb and Database
mongoose
	.connect("mongodb://localhost/restful_blog_app", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("DB Connected!"))
	.catch(err => {
		console.log(`DB Connection Error:${err.message}`);
	});

app.set("view engine", "ejs");
app.use(static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Mongoose/Model Config
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	altTag: String,
	// {type :String, default: 'placeholderimage.jpg'}, this would give use a placeholder image if we didn't put a custom string
	body: String,
	created: {
		type: Date,
		default: Date.now
	}
});
const Blog = mongoose.model("blog", blogSchema);
// this was a test blog to see if it worked
// Blog.create({
// 	title: "test Blog",
// 	image:
// 		"https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
// 	body: "hello this is a blog post",
// 	altTag: "picture of a beautiful dog"
// });
app.get("/", function(req, res) {
	res.redirect("/blogs");
});
// 7 Restful Routes
//index
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log("error!");
		} else {
			res.render("index", { blogs: blogs });
		}
	});
});
//new routh
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

//create route
app.post("/blogs", (req, res) => {
	//create blog
	Blog.create(req.body.blog, function(err, newblog) {
		if (err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

//show route
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("show", { blog: foundBlog });
		}
	});
});

//edit route
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", { blog: foundBlog });
		}
	});
});
//update route
app.put("/blogs/:id", function(req, res) {
	res.send("update Route!");
});
//destroy route

app.listen(port, () => console.log("Working"));
