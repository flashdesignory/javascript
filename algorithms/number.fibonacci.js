/*
 * @title: Fibonacci
 * @description: Different implementations for Fibonacci
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * In mathematics, the Fibonacci numbers are the numbers in the following
 * integer sequence, called the Fibonacci sequence, and characterized by the
 * fact that every number after the first two is the sum of the two preceding ones:
 * 1 , 1 , 2 , 3 , 5 , 8 , 13 , 21 , 34 , 55 , 89 , 144
 * Often, especially in modern usage, the sequence is extended by one more initial term:
 * 0 , 1 , 1 , 2 , 3 , 5 , 8 , 13 , 21 , 34 , 55 , 89 , 144
 * F = (n-1) + (n-2)
 */

// iteration / O(n)
function fibonacciOne(n) {
  const arr = [0, 1];

  if (n <= 2) return 1;

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n];
}

// example
console.log(fibonacciOne(12));

// recursive / O(2n)
function fibonacciTwo(n) {
  if (n <= 1) return n;
  return fibonacciTwo(n - 1) + fibonacciTwo(n - 2);
}

// example
console.log(fibonacciTwo(12));

// recursive with memoization
function fibonacciThree(n, memo) {
  memo = memo || {};
  if (memo[n]) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacciThree(n - 1, memo) + fibonacciThree(n - 2, memo);
  return memo;
}

// example
console.log(fibonacciThree(12));
