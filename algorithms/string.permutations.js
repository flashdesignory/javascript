/*
 * @title: create permutations
 * @description: Simple function to create permutations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//heaps
function swap(arr, a, b){
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function permutations(array, n, result){
  n = n || array.length;
  result = result || [];
  var i,j;
  if (n === 1) {
    console.log(array);
  } else {
    for (i = 1; i <= n; i++) {
      permutations(array, n - 1, result);
      if (n % 2) {
        j = 1;
      } else {
        j = i;
      }
      swap(array, j - 1, n - 1);
    }
   
  }
}

permutations(['a', 'b', 'c', 'd']);

//backtracking
//O (n*n!)
function swap (alphabets, index1, index2) {
  var temp = alphabets[index1];
  alphabets[index1] = alphabets[index2];
  alphabets[index2] = temp;
  return alphabets;
}

function permute (alphabets, startIndex, endIndex) {
  if (startIndex === endIndex) {
	console.log(alphabets.join(''));
  } else {
    for (var i = startIndex; i <= endIndex; i++) {
      swap(alphabets, startIndex, i);
      permute(alphabets, startIndex + 1, endIndex);
      swap(alphabets, i, startIndex); // backtrack
    }
  }
}

var alphabets = ['A','B','C', 'D'];
permute(alphabets, 0, alphabets.length-1); // ABC, ACB, BAC, BCA, CBA, CAB