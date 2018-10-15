/*
 * @title: Rotate Point Array
 * @description: function to find rotation point in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findMin(arr){
  if(arr.length <= 0) return -1; // empty array

  function find(arr, left, right){
    let min = arr[left];
    let max = arr[right];

    if(min <= max) return min; // only one element or sorted

    let middle = Math.floor((right-left)/2) + left; // middle index;

    //first element to the right of middle smallest
    if(middle < right && arr[middle+1] < arr[middle]){
      return arr[middle+1];
    }

    //middle is smallest
    if(middle > left && arr[middle-1] > arr[middle]){
      return arr[middle];
    }

    if(arr[right] > arr[middle]){
      return find(arr, left, middle-1);
    }
    return find(arr, middle+1, right);
  }

  return find(arr, 0, arr.length-1);
}

console.log(findMin([4, 5, 6, 7, 0, 1, 2]));
console.log(findMin([4,5,6,7,8,9,1,2,3]));
console.log(findMin([7]));
console.log(findMin([]));
console.log(findMin([3,4,2]));
console.log(findMin([1,2,3]))
