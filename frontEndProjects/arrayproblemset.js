//printReverse
function printReverse(arr) {
  let reversed = arr.reverse();
  console.log(reversed);
}

printReverse([1, 2, 3, 4, 5, 6, 9, "hello"]);

// alternative version!!!
// //function printReverse(arr){
//  for(var i = arr.length - 1; i >= 0; i--){
//    console.log(arr[i]);
// }

//isUniform
function isValueSame(arr) {
  let first = arr[0];
  for (i = 0; i < arr.length; i++) {
    if (arr[i] !== first) {
      return console.log(false);
    }
  }
  return console.log(true);
}
isValueSame([1, 1, 1, 1, 1, 1]);

//sumArray
function sumArray(arr) {
  let result = 0;
  arr.forEach(function(element) {
    result += element;
  });

  console.log(result);
}

sumArray([2, 3, -5, 100, -50, 50]);

// //
function max(arr) {
  let math = Math.max(...arr);
  console.log(math);
}

/*function max(arr){
  let max = arr[0];
  for(i=1; i < arr.length;i++){
    if(arr[i] > max){
      max = arr[i];
    }
  }
  */

max([1, 2, 3, 4, 78, 98, 109]);
