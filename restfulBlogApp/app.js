const express = require('express');
app = express();
const port = 3000;
bodyParser = require('body-parser');

mongoose = require('mongoose');

//MongoDb and Database
mongoose
	.connect('mongodb://localhost/restful_blog_app', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
		console.log(`DB Connection Error:${err.message}`);
	});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose/Model Config
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	// {type :String, default: 'placeholderimage.jpg'}, this would give use a placeholder image if we didn't put a custom string
	body: String,
	created: {
		type: Date,
		default: Date.now
	}
});
const Blog = mongoose.model('blog', blogSchema);
// this was a test blog to see if it worked
/*Blog.create({
	title: 'test Blog',
	image:
		'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
	body: 'hello this is a blog post'
});*/

// Restful Routes

app.get('/blogs', (req, res)   => {
	res.render('index');
});

app.listen(port, () => console.log('Working'));
