/*
 * @title: Reverse Int
 * @description: reverse an int and return result
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reverseInt(n) {
  let reversed = n.toString().split('').reverse().join('');
  if (n < 0) {
    reversed = reversed.substr(0, reversed.length - 1);
  }

  // if (reversed.substr(-1) === '-') reversed = reversed.substr(0, reversed.length - 1);
  return Number(reversed) * Math.sign(n);
}

function reverse(arr) {
  const middle = Math.floor(arr.length / 2);
  for (let i = 0; i < middle; i++) {
    const temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
}

function reverseInt2(n) {
  const chars = n.toString().split('');
  const reversed = reverse(chars);

  if (reversed[reversed.length - 1] === '-') {
    reversed.splice(-1);
    return -Number(reversed.join(''));
  }

  return Number(reversed.join(''));
}

// npx jest algorithms/number/number.reverseint.js
test('reverseInt()', () => {
  expect(reverseInt(981)).toEqual(189);
  expect(reverseInt(-500)).toEqual(-5);
});
test('reverseInt2()', () => {
  expect(reverseInt2(981)).toEqual(189);
  expect(reverseInt2(-500)).toEqual(-5);
});
