const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, resp) => resp.send("Hi there, welcome to my assignment!"));

app.get("/speak/:animal", (req, resp) => {
  let animal = req.params.animal;
  let sound = {
    pig: "oink",
    cow: "mow",
    dog: "Woof Woof",
    cat: "Meow",
    human: "...HELLO THERE"
  };
  let sounds = sound[animal];
  resp.send(`The ${animal} says ${sounds}`);
});

app.get("/repeat/:word/:num", (req, resp) => {
  let words = req.params.word;
  let number = req.params.num;
  console.log(number);
  let result = "";
  for (i = 0; i < number; i++) {
    result += words + " ";
  }
  resp.send(result);
});

app.get("*", (req, resp) => resp.send("Sorry Page Not Found"));

app.listen(port, () => console.log(`Exampled app listening on port ${port}!`));
