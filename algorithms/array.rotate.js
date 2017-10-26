/*
 * @title: Rotate Array
 * @description: Simple function to rotate array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

//verification of input:
//if(isNaN(k) || k < 0) return;
//if(arr.length == 0 ) return;
//if(k > arr.length)k = k%arr.length; 

var nums = [1,2,3,4,5,6,7,8];             

// O(n) time & space
function rotateArray_one(arr, k){
	var result = [];
	var i;

	for(i = 0; i<k; i++){
		//console.log(arr[arr.length-k+i]);
		result.push(arr[arr.length-k+i]);
	}

	for(i = 0; i<arr.length-k; i++){
		//console.log(arr[i]);
		result.push(arr[i]);
	}

	return result;
}

console.log(rotateArray_one(nums, 3));

// O(n) time & space
function rotateArray_two(arr, k){
	var result = [];
	var i;
	var index = 0;

	for(i = 0; i<k; i++){
		//console.log(arr[arr.length-k+i]);
		result.push(arr[arr.length-k+i]);
    	//result[i] = arr[arr.length-k+i];
	}

	for(i = k; i<arr.length; i++){
		//console.log(arr[index]);
		result.push(arr[index]);
		//result[i] = arr[index];
		index++;
	}

	return result;
}

console.log(rotateArray_two(nums, 3));

// O(n*k) time O(1) space
function rotateArray_three(arr, k){
	for(var i = 0; i<k; i++){
		for(var j = arr.length-1; j> 0; j--){
			var temp = arr[j];
			arr[j] = arr[j-1];
			arr[j-1] = temp;
		}
	}

	return arr;
}

console.log(rotateArray_three(nums, 3));