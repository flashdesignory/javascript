/*
 * @title: Sieve of Eratosthenes
 * @description: find all primes up to n
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function primes(n) {
  const result = [];
  for (let i = 0; i <= n; i++) {
    result[i] = true;
  }
  result[0] = false;
  result[1] = false;

  const limit = Math.sqrt(n);

  for (let i = 2; i <= limit; i++) {
    for (let j = 2; i * j <= n; j++) {
      result[i * j] = false;
    }
  }

  return result.reduce((acc, val, index) => (val ? acc.concat(index) : acc), []);
}

// npx jest algorithms/number/number.prime.sieve.js
test('findPrimes()', () => {
  expect(primes(10)).toEqual([2, 3, 5, 7]);
});
