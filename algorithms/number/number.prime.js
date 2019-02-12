/*
 * @title: Prime Number
 * @description: prime numbers can only divide by itself and one.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isPrimeOne(number) {
  let divisor = 2;

  while (number > divisor) {
    if (number % divisor === 0) {
      return false;
    }
    divisor++;
  }
  return true;
}

console.log(isPrimeOne(137));
console.log(isPrimeOne(237));

function isPrimeTwo(number) {
  let divisor = 3;
  const limit = Math.sqrt(number);

  if (number === 2 || number === 3) {
    return true;
  }

  if (number % 2 === 0) {
    return false;
  }

  while (divisor <= limit) {
    if (number % divisor === 0) {
      return false;
    }
    divisor += 2;
  }

  return true;
}

console.log(isPrimeTwo(137));
console.log(isPrimeTwo(237));

// npx jest algorithms/number/number.prime.js
describe('isPrime solutions', () => {
  test('isPrimeOne(137)', () => {
    expect(isPrimeOne(137)).toEqual(true);
  });
  test('isPrimeOne(237)', () => {
    expect(isPrimeOne(237)).toEqual(false);
  });
  test('isPrimeTwo(137)', () => {
    expect(isPrimeTwo(137)).toEqual(true);
  });
  test('isPrimeTwo(237)', () => {
    expect(isPrimeTwo(237)).toEqual(false);
  });
});
