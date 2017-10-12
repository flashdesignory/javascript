/*
 * @title: Fibonacci
 * @description: Different implementations for Fibonacci
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * In mathematics, the Fibonacci numbers are the numbers in the following integer sequence, called the Fibonacci sequence, and characterized by the fact that every number after the first two is the sum of the two preceding ones:
 * 1 , 1 , 2 , 3 , 5 , 8 , 13 , 21 , 34 , 55 , 89 , 144 
 * Often, especially in modern usage, the sequence is extended by one more initial term:
 * 0 , 1 , 1 , 2 , 3 , 5 , 8 , 13 , 21 , 34 , 55 , 89 , 144
 * F = (n-1) + (n-2)
 */

//iteration / O(n)
function fibonacci_one(n){
	var arr = [0,1];

	if(n <= 2) return 1;

	for(var i = 2; i<= n; i++){
		arr[i] = arr[i-1] + arr[i-2];
	}

	return arr[n];
}

//example
console.log(fibonacci_one(12));


//recursive / O(2n)
function fibonacci_two(n){
	if(n <= 1) return n;
	else return fibonacci_two(n-1) + fibonacci_two(n-2);
}

//example
console.log(fibonacci_two(12));

//recursive with memoization
function fibonacci_three(n, memo){
	memo = memo || {};
	if(memo[n]) return memo[n];
	if(n<= 1) return n;
	return  memo[n] = fibonacci_three(n-1, memo) + fibonacci_three(n-2, memo);
}

//example
console.log(fibonacci_three(12));