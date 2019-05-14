/*
 * @title: Binary Numbers
 * @description: Example for a binary operators - Interview Cake
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* The XOR operation (or exclusive or) takes two bits and returns 111 if
  exactly one of the bits is 111. Otherwise, it returns 000.

1 ^ 1  →  0
1 ^ 0  →  1
0 ^ 1  →  1
0 ^ 0  →  0

When performing XOR on two integers, the XOR operation is calculated on
each pair of bits (the two bits at the same index in each number).

5 ^ 6  // gives 3

At the bit level:

     0101  (5)
   ^ 0110  (6)
   = 0011  (3)
*/

function findUniqueNumber(arr) {
  let uniqueId = 0;

  for (let i = 0; i < arr.length; i++) {
    uniqueId ^= arr[i]; //eslint-disable-line
  }
  return uniqueId;
}

// npx jest algorithms/number/number.binary.unique.js
test('findUniqueNumber()', () => {
  expect(findUniqueNumber([4, 6, 4, 6, 5, 8, 9, 7, 7, 8, 9])).toEqual(5);
});
