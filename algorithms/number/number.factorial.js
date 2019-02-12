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

// reursive
function factorialTwo(n) {
  if (n <= 1) return 1;
  return n * factorialTwo(n - 1);
}

// while loop
function factorialThree(n) {
  let result = n;
  while (n > 1) {
    result *= --n;
  }
  return result;
}

// recursive
// memoization - top down
function factorialFour(n, memo) {
  memo = memo || [];
  if (n === 1) return 1;
  if (memo[n]) return memo[n];
  memo[n] = n * factorialFour(n - 1, memo);
  return memo[n];
}
// iterative
// tabulation - bottom up
function factorialFive(n) {
  const result = [1];
  for (let i = 1; i <= n; i++) {
    result[i] = result[i - 1] * i;
  }
  return result[n];
}

// npx jest algorithms/number.factorial.js
describe('factorial solutions', () => {
  test('factorialOne', () => {
    expect(factorialOne(4)).toEqual(24);
  });
  test('factorialTwo', () => {
    expect(factorialTwo(4)).toEqual(24);
  });
  test('factorialThree', () => {
    expect(factorialThree(4)).toEqual(24);
  });
  test('factorialFour', () => {
    expect(factorialFour(4)).toEqual(24);
  });
  test('factorialFive', () => {
    expect(factorialFive(4)).toEqual(24);
  });
});
