function isEven(x) {
  // the === will determine if true or false don't need a if else statement
  x % 2 === 0

}


function factorial(x) {
  let one = 1;

  for (i = x; i >= 0; i--) {
    one *= i;
  }
  return one;
}

function kebabToSnake(str) {
  let myString = str.replace(/-/g, "_");
  return myString;
}