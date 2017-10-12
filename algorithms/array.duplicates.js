/*
 * @title: Remove Duplicates from Array
 * @description: Simple function to remove dupes from array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
 
function removeDuplicates(arr){
  var i = arr.length-1;
  var seen = {};
  while(i >= 0){
    if(!seen[arr[i]]){
      seen[arr[i]] = true;
    }else{
      console.log("already there");
      arr.splice(i, 1);
    }
    i--;
  }
  return arr;
}

var nums = [1,3,5,2,3,4,8,6,4,5,5,3];
var result = removeDuplicates(nums);
console.log(result);