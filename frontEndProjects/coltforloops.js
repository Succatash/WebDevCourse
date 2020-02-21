//For Loops

//Print all numbers between -10 and 19

for (i = -10; i <= 19; i++) {
  console.log(` Loop 1: ${i}`);
}

// Print all even numbers between 10 and 40

//Option 1 will only work if we start on an even number otherwise we will just add 2 getting all odds
for (counter = 10; counter <= 40; counter += 2) {
  console.log(`Loop 2: Even ${counter}`);
}

//Option 2
for (counter = 10; counter <= 40; counter++) {
  if (counter % 2 === 0) {
    console.log(`Loop 2: Even ${counter}`);
  }
}
//Print all odd numbers between 300 and 333
for (i = 300; i <= 333; i++) {
  if (i % 2 !== 0) {
    console.log(`Loop 3: Odd Numbers ${i}`);
  }
}

//Print all numbers divisible between 5 and 3 between 5 and 50, HINT: (var === 5 && var === 3)
for (i = 5; i <= 50; i++) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log(`Loop 4: Odd Numbers ${i}`);
  }
}
