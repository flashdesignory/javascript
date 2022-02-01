/*
 * @title: longest sequence
 * @description: find longest sequence in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findLongestSequenceOne(arr) {
  let start = 0;
  let end = 0;
  let greatestLength = 0;
  let greatestArray = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      end++;
    } else {
      if (start !== end) {
        const currentLength = (end - start) + 1;
        if (currentLength > greatestLength) {
          greatestLength = currentLength;
          greatestArray = arr.slice(start, end + 1);
        }
      }
      start = i;
      end = i;
    }
  }
  return greatestArray;
}

function findLongestSequenceTwo(arr) {
  let result = [];
  let start = 0;
  for (let i = 1; i < arr.length; i++) {
    // if previous is the same as current - 1
    if (!(arr[i] - 1 === arr[i-1])) {
      // if start index is not i - 1
      // meaning there has to be more than 1 value in a sequence
      if (start !== i - 1) {
        // if current length is greater than previous result
        if ((i - start + 1) > result.length) {
          result = arr.slice(start, i);
        }
      }
      start = i;
    }
  }
  return result;
}

// npx jest algorithms/array/array.sequence.js
test('findLongestSequenceOne()', () => {
  const nums = [0, 4, 3, 5, 7, 1, 2, 3, 4, 9, 11, 14, 15, 16, 17, 18, 19, 21];
  expect(findLongestSequenceOne(nums)).toEqual([14, 15, 16, 17, 18, 19]);
});
test('findLongestSequenceTwo()', () => {
  const nums = [0, 4, 3, 5, 7, 1, 2, 3, 4, 9, 11, 14, 15, 16, 17, 18, 19, 21];
  expect(findLongestSequenceTwo(nums)).toEqual([14, 15, 16, 17, 18, 19]);
});
