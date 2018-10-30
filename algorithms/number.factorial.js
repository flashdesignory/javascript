/*
 * @title: Factorial
 * @description: Different implementations for Factorial
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * The result of multiplying a sequence of descending natural numbers down to 1
 * (such as 4 × 3 × 2 × 1)
 * 4! = 4 × 3 × 2 × 1 = 24
*/

// iteration
function factorialOne(n) {
  let result = 1;

  // limit > 0 since we can't multiply by 0
  for (let i = n; i > 0; i--) {
    result *= i;
  }

  return result;
}

// example
console.log(factorialOne(4));

// reursive
function factorialTwo(n) {
  if (n <= 1) return 1;
  return n * factorialTwo(n - 1);
}

console.log(factorialTwo(4));

// while loop
function factorialThree(n) {
  let result = n;

  while (n > 1) {
    result *= --n;
  }

  return result;
}

console.log(factorialThree(4));
