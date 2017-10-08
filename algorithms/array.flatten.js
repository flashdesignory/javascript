/*
 * @title: Flatten Array
 * @description: Simple function to flatten array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function flattenArray(arr, result){
	result = result || [];
	for(var i = 0; i<arr.length; i++){
		Array.isArray(arr[i]) ? flattenArray(arr[i], result) : result.push(arr[i]);
	}
	return result;
}

var nums = [1,2,3,[4,5],[6,[7,8]]];
console.log(flattenArray(nums));