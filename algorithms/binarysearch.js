/*
 * @title: Binary Search
 * @description: Example for a binary search
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
 
function binarySearch(arr, item){
  var min = 0; 
  var max = arr.length-1;
  var middle;
  
  while(min <= max){
    middle = Math.floor((min+max)/2);
    if(arr[middle] == item){
      return middle;
    }else if(arr[middle] < item){
      min = middle + 1;
    }else{
      max = middle-1;
    }
  }
  
  return -1;
}

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
					41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var result = binarySearch(primes, 53);
console.log(result);