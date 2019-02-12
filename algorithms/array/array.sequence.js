/*
 * @title: longest sequence
 * @description: find longest sequence in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findLongestSequence(arr) {
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
          // console.log("longest sequence: " + start + " , " + end);
          // console.log(currentLength);
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

// npx jest algorithms/array/array.sequence.js
test('findLongestSequence()', () => {
  const nums = [0, 4, 3, 5, 7, 1, 2, 3, 4, 9, 11, 14, 15, 16, 17, 18, 19, 21];
  expect(findLongestSequence(nums)).toEqual([14, 15, 16, 17, 18, 19]);
});
