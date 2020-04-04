/*
 * @title: Hamming Weight - Number of 1 Bits
 * @description: count number of 1s in binary representation of an integer.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// toString(2) The number will show as a binary value
// eslint-disable-next-line
function hammingWeight1(n) {
  return n.toString(2).split('0').join('').length;
}

// Brian Kernighan’s Algorithm
// eslint-disable-next-line
function hammingWeight2(n) {
  let count = 0;
  while (n) {
    n &= (n - 1); //eslint-disable-line
    count++;
  }

  return count;
}

// npx jest algorithms/number/number.binary.weight.js
/* test('hamming weight: ', () => {
  expect(hammingWeight1(00000000000000000000000000001011)).toEqual(3);
  expect(hammingWeight2(00000000000000000000000000001011)).toEqual(3);
}); */

// eslint-disable-next-line
// console.log(hammingWeight1(00000000000000000000000000001011));
// console.log(hammingWeight2(00000000000000000000000000001011));
test.skip('skip', () => {});
