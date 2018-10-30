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
