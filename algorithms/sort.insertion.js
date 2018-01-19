/*
 * @title: Insertion Sort
 * @description: split array into two sections, swap if needed
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//Big O(n) time Big O(1) space
function insertionSort(arr){
 for(var i = 1; i<arr.length; i++){
   for(var j = 0; j<i; j++){
     if(arr[j] > arr[i]){
       var temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
     }
   }
 }
  return arr;
}

//
var nums = [7,9,3,4,2,8,5,1];
console.log(insertionSort(nums));

function insertionSort_two(arr){
    for (var i=0; i < arr.length; i++) {
       var value = arr[i];
        for (var j=i-1; j > -1 && arr[j] > value; j--) {
            arr[j+1] = arr[j];
        }
        arr[j+1] = value;
    }
    
  return arr;
}
console.log(insertionSort_two([7,9,3,4,2,8,5,1]))