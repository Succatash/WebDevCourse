let p1button = document.querySelector("#p1");
let p2button = document.getElementById("p2");
let reset = document.getElementById("reset");
let h1 = document.querySelector("h1");
let p1score = 0;
let p2score = 0;
let p1display = document.getElementById("score_p1");
let p2display = document.querySelector("#score_p2");
let gameOver = false;
let winningScore = 5;
let points = document.getElementById("totalPoints");
let numInput = document.querySelector("input");

p1button.addEventListener("click", function() {
  //use booleans as actual logic, i.e. the game isn't over at the beginning
  //if !gameover (meaning gameOver hasn't hit true) then increase point, then check if game is over if not do nothing if it is make gameOver true.
  if (!gameOver) {
    p1score++;
    if (p1score === winningScore) {
      gameOver = true;
      p1display.classList.add("winner");
    }
  }

  p1display.innerHTML = p1score;
});

p2button.addEventListener("click", function() {
  if (!gameOver) {
    p2score++;
    if (p2score === winningScore) {
      gameOver = true;
      p2display.classList.add("winner");
    }
  }
  p2display.textContent = p2score;
});

reset.addEventListener("click", function() {
  resetScore();
});

numInput.addEventListener("change", function() {
  points.textContent = this.value;
  // winningScore = Number(numInput.value);
  winningScore = +this.value;
  resetScore();
});

function resetScore() {
  p1score = 0;
  p2score = 0;
  p1display.innerHTML = 0;
  p2display.textContent = 0;
  p1display.classList.remove("winner");
  p2display.classList.remove("winner");
  gameOver = false;
}
