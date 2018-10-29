/*
 * @title: Reverse Array
 * @description: Simple function to reverse array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 var nums = [1,2,3,4,5,6,7];

 function reverseArray_one(arr){
    var left = 0;
    var right = arr.length-1;

    while(left < right){
      var temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }

    return arr;
 }

console.log(reverseArray_one(nums));

function reverseArray_two(arr){
	var len = arr.length;
	var middle = Math.floor(len/2);

	for(var i = 0; i<middle; i++){
		var temp = arr[i];
		arr[i] = arr[len-1-i];
		arr[len-1-i] = temp;
	}

	return arr;
}

console.log(reverseArray_two(nums));
