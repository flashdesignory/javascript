/*
 * @title: Combinations
 * @description: Calculate Combinations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 //itteration
 function combinations(str){
 	var result = [];

 	for(var i = 0; i<str.length; i++){
 		var resultLength = result.length;
 		for(var j = 0; j<resultLength; j++){
 			result.push(str[i] + result[j]);
 		}
 		result.push(str[i]);
 	}

 	console.log(result.length);
 	return result;
 }

 //example
 console.log(combinations("abcd"));

 //recursive
 function combinations_two(str){
 	var result = [];

 	function combine(used, unused){
 		if(!used && !unused) return;
 		if(!unused) result.push(used);
 		else{
 			combine(used + unused[0], unused.slice(1));
 			combine(used, unused.slice(1));
 		}
 	}

 	combine("", str);
 	console.log(result.length);
 	return result;
 }

 //example
 console.log(combinations_two("abcd"));

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