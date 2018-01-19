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
function rotate(arr, left, right){
	//console.log("rotate(" + arr + ", left: " + left + ", right: " + right + ")");
	while(left < right){
		var temp = arr[left];
		arr[left] = arr[right];
		arr[right] = temp;
		left++;
		right--;
	}
}

function rotateArray_two(arr, k){
	if(arr.length < 2) return arr;
	k = k%arr.length; //if k is larger than arr.length
	if(k === 0) return arr;

	arr.reverse();

	rotate(arr, 0, k-1);
	rotate(arr, k, arr.length-1)

	return arr;
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