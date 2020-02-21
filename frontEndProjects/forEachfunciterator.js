// function myForEach(arr, func) {
//   //loop through array
//   for (var i = 0; i < arr.length; i++) {
//     //call func for each item in an array
//     func(arr[i]);
//   }
// }

// colors = ["red", "yellow", "blue", "purple"];

// myForEach(colors, console.log);

Array.prototype.myForEach = function(piiza) {
	for (var i = 0; i < this.length; i++) {
		/*this evalautes the array that we put in the argument when invoke the function it*/
		piiza(this[i]);
	}
};

let friends = ['nicole', 'john', 'marie', 'severen'];

friends.myForEach(function(name) {
	console.log(`My best fiends are ${name}`);
});
