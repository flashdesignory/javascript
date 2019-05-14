/*
 * @title: Reverse Bits
 * @description: Reverse bits of a given 32 bits unsigned integer.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// eslint-disable-next-line
function reverseBits1(n) {
  let result = 0;
  let count = 32;

  while (count--) {
    result *= 2;
    result += n & 1; //eslint-disable-line
    n = n >> 1; //eslint-disable-line
  }

  return result;
}

// eslint-disable-next-line
function reverseBits2(n) {
  let ans = 0;
  for (let i = 0; i < 32; i += 1) {
    ans <<= 1; //eslint-disable-line
    ans |= n & 1; // eslint-disable-line
    n >>= 1; // eslint-disable-line
  }
  return ans >>> 0; // eslint-disable-line
}

// eslint-disable-next-line
function reverseBits3(n) {
  const str = n.toString(2).padStart(32, '0');
  return parseInt(str.split('').reverse().join(''), 2);
}

// npx jest algorithms/number/number.binary.reverse.js
/* test('reverse bits: ', () => {
  expect(reverseBits1(00000010100101000001111010011100)).toEqual(43261596);
  expect(reverseBits2(00000010100101000001111010011100)).toEqual(43261596);
  expect(reverseBits3(00000010100101000001111010011100)).toEqual(43261596);
}); */
