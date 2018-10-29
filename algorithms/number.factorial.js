/*
 * @title: Factorial
 * @description: Different implementations for Factorial
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 /**
  * The result of multiplying a sequence of descending natural numbers down to 1 (such as 4 × 3 × 2 × 1)
  * 4! = 4 × 3 × 2 × 1 = 24
  */

//iteration
function factorial_one(n){
	var result = 1;

	//limit > 0 since we can't multiply by 0
	for(var i = n; i>0; i--){
		result *= i;
	}

	return result;
}

//example
console.log(factorial_one(4));

 //reursive
 function factorial_two(n){
	if(n <= 1) return 1;
	return n * factorial_two(n-1);
 }

 console.log(factorial_two(4));

 //while loop
function factorial_three(n){
	var result = n;

	while(n > 1){
		result *= --n;
	}

	return result;
 }

 console.log(factorial_three(4));
