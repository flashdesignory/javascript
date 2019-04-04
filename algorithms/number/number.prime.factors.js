/*
 * @title: Prime Factors
 * @description: find prime factors of given number and return
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findPrimes(n) {
  const factors = [];
  let divisor = 2;

  while (n > 2) {
    if (n % divisor === 0) {
      factors.push(divisor);
      n = n / divisor; // eslint-disable-line
    } else {
      divisor++;
    }
  }

  return factors;
}

// npx jest algorithms/number/number.prime.factors.js
test('findPrimes()', () => {
  expect(findPrimes(69)).toEqual([3, 23]);
});
