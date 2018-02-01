/*
 * @title: create permutations
 * @description: Simple function to create permutations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//helper functions
function swap(arr, a, b){
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function permutations(arr){
  var result = [];

  function permute(n){
    if(n == 1){
      result.push(arr.join());
    }else{
      for(var i = 0; i<n; i++){
        permute(n-1);
        swap(arr, n % 2 ? 0 : i, n-1);
      }
    }
  }

  permute(arr.length);
  return result;
}

console.log(permutations(["a", "b", "c", "d"]));

//heaps
function permutations_one(array, n, result){
  n = n || array.length;
  result = result || [];
  var i,j;
  if (n === 1) {
    console.log(array);
  } else {
    for (i = 1; i <= n; i++) {
      permutations_one(array, n - 1, result);
      if (n % 2) {
        j = 1;
      } else {
        j = i;
      }
      swap(array, j - 1, n - 1);
    }
   
  }
}

permutations_one(['a', 'b', 'c', 'd']);

//variation
function permutations_two(arr){
  var result = [];
  var stack = [];
  
  function permute(){
    if(arr.length === 0){
      result.push(stack.slice());
    }
    for(var i = 0; i<arr.length; i++){
      var x = arr.splice(i, 1);
      stack.push(x);
      permute();
      stack.pop();
      arr.splice(i, 0, x);
    }
  }
  
  permute();
  
  for (var i = 0; i < result.length; i++) {
      result[i] = result[i].join('');
  }

  return result;
}

console.log(permutations_two(['a', 'b', 'c', 'd']));

//backtracking
//O (n*n!)
function permutations_three (alphabets, startIndex, endIndex) {
  if (startIndex === endIndex) {
	console.log(alphabets.join(''));
  } else {
    for (var i = startIndex; i <= endIndex; i++) {
      swap(alphabets, startIndex, i);
      permutations_three(alphabets, startIndex + 1, endIndex);
      swap(alphabets, i, startIndex); // backtrack
    }
  }
}

var alphabets = ['A','B','C', 'D'];
permutations_three(alphabets, 0, alphabets.length-1); // ABC, ACB, BAC, BCA, CBA, CAB