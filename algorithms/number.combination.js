/*
 * @title: Combinations
 * @description: Calculate Combinations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 //itteration
 function combinations(arr){
 	var result = [];

 	for(var i = 0; i<arr.length; i++){
 		var item_one = arr[i];
 		for(var j = i+1; j<arr.length; j++){
 			var item_two = arr[j];
 			result.push([item_one, item_two]);
 		}
 	}

 	return result;
 }

 //example
 console.log(combinations(["a","b","c","d"]));

 //recursive with factorial
 //Formula: n! / k!(n- k)!
 
 function factorial(n){
 	if(n <= 1) return 1;
 	return n * factorial(n-1);
 }

 function combinationsCount(n, k){
 	var result = 1;

 	var divisor = (factorial(k) * factorial(n-k));
	if(divisor){
	   result = factorial(n)/divisor;
	}

 	return result;
 }

 //example
  console.log(combinationsCount(4, 2));