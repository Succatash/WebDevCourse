const average = (...numbers) =>
  Math.floor(
    numbers.reduce((accumulator, value) => accumulator + value / numbers.length)
  );

let scores = [90, 98, 89, 100, 86, 94];
score2 = [1, 2, 3];
console.log(average(...scores));
console.log(average(...score2));
