//this gives us the ability to manual determine the size of the array, need to create more div blocks if you want more then 6
let numSqaures = 6;
/*this is the array of 6 blocks we can add more blocks in html if we want 0 blocks*/
let colors = generateRandomColors(numSqaures);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1Color = document.querySelector("h1");
let resetButton = document.getElementById("reset");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
const selected = document.querySelector(".selected");

//this displays the picked color
colorDisplay.textContent = pickedColor;

/*make easy hard buttons work easy to 3 squares hard to 6 and css shows which is clicked*/
easy.addEventListener("click", function() {
  easy.classList.add("selected");
  hard.classList.remove("selected");
  //this says there is an array of 3
  numSqaures = 3;
  colors = generateRandomColors(numSqaures);
  //this picks the winning color
  pickedColor = pickColor();
  //this displays the picked color in h1 when i press easy button
  colorDisplay.innerHTML = pickedColor;
  /* loops through the squares arrays if there is a color in the array, because of generateRandom function we will only get colors in number of arguments we select otherwise they remaing 3 will stay the colors from the game beforehand and not change color therefore we want to hide them*/
  for (i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
});

hard.addEventListener("click", function() {
  hard.classList.add("selected");
  easy.classList.remove("selected");
  numSqaures = 6;
  colors = generateRandomColors(numSqaures);
  pickedColor = pickColor();
  colorDisplay.innerHTML = pickedColor;
  for (i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block";
  }
});

//reset button
resetButton.addEventListener("click", function() {
  //generate all new colors

  colors = generateRandomColors(numSqaures);
  // pick new color from array
  pickedColor = pickColor();

  //change color display to match color
  colorDisplay.textContent = pickedColor;

  h1Color.style.backgroundColor = "#232323";

  //change colors of sqaures
  for (i = 0; i < colors.length; i++) {
    //add initial colors to square
    squares[i].style.backgroundColor = colors[i];
  }
});

//sets colors for each square and
for (i = 0; i < colors.length; i++) {
  //add initial colors to square
  squares[i].style.backgroundColor = colors[i];
  //add event listner for click
  squares[i].addEventListener("click", function() {
    //grabs color of picked square
    const clickedColor = this.style.backgroundColor;

    //loop for correct or try again
    if (clickedColor === pickedColor) {
      messageDisplay.innerHTML = "Correct";
      changedColors(clickedColor);
      h1Color.style.backgroundColor = clickedColor;
      resetButton.textContent = "Play Again?";
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  });
}

function changedColors(color) {
  //square change to correct color
  for (i = 0; i < squares.length; i++) {
    //change each color to match
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  let randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
}

function generateRandomColors(num) {
  //make an array
  let arr = [];
  //reaot num times

  for (i = 0; i < num; i++) {
    //get random color and push into an array
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a red from 0 -255
  let r = Math.floor(Math.random() * 256);
  //pick a green from 0 -255
  let g = Math.floor(Math.random() * 256);
  //pick a blue from 0 -255
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
