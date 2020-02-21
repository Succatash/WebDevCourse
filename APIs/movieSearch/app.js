/*General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 

So everything is exactly the same as Colt explains in the following videos, except you must append &apikey=thewdb to the end of your url.*/
const express = require("express");

const app = express();
const request = require("request");

const port = 3000;

// const bodyParser = require("body-parser");

app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("searchingFor");
});

app.get("/results", (req, res) => {
  console.log(req.query.search);

  var url = `http://www.omdbapi.com/?s=${req.query.search}&apikey=thewdb`;

  request(url, (err, resp, body) => {
    if (err) {
      console.log("Something went wrong");
      console.error("error:", err);
    } else {
      const data = JSON.parse(body);
      // Be VERY CAREFUL letter case matters search fails Search works

      //res.send(data.Search[1]); will show us the object of the API

      res.render("results", { data: data });
    }
  });
});

app.listen(port, () => console.log("Server is working"));
