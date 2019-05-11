/*
 * @title: Single Number
 * @description: Given a non-empty array of integers, every element
 * appears twice except for one. Find that single one.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function singleNumber1(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) return arr[i];
  }
  return null;
}

function singleNumber2(arr) {
  let single;
  for (let i = 0; i < arr.length; i++) {
    single ^= arr[i]; //eslint-disable-line
  }
  return single;
}

function singleNumber3(arr) {
  return arr.reduce((prev, curr) => prev ^ curr, 0); // eslint-disable-line
}

// npx jest algorithms/number/number.single.js
test('singleNumber1()', () => {
  expect(singleNumber1([4, 1, 2, 1, 2])).toEqual(4);
});
test('singleNumber2()', () => {
  expect(singleNumber2([4, 1, 2, 1, 2])).toEqual(4);
});
test('singleNumber3()', () => {
  expect(singleNumber3([4, 1, 2, 1, 2])).toEqual(4);
});
