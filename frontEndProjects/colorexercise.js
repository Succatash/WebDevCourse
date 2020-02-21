//selecting
let button = document.querySelector("button");
let body = document.querySelector("body");
let isPurple = "false";

// //color toggle exercise w/ ternary operator

// button.addEventListener("click", function() {
//   body.style.backgroundColor =
//     body.style.backgroundColor === "white" ? "purple" : "white";
// });

// //option 2 with if/else

// button.addEventListener("click", function() {
//   if (isPurple) {
//     document.body.style.background = "White";
//   } else {
//     document.body.style.background = "purple";
//   }
//   isPurple = !isPurple;
// });

//option 3

button.addEventListener("click", function() {
  document.body.classList.toggle("purple");
});
