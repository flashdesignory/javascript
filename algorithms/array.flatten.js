/*
 * @title: Flatten Array
 * @description: Simple function to flatten array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * input: [1, 2, 3, [4, 5], [6, [7, 8]]]
 * output: [1, 2, 3, 4, 5, 6, 7, 8]
 */

function flattenArray(arr, result) {
  result = result || [];
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) ? flattenArray(arr[i], result) : result.push(arr[i]);
  }
  return result;
}

// npx jest algorithms/array.flatten.js
test('flattenArray()', () => {
  const nums = [1, 2, 3, [4, 5], [6, [7, 8]]];
  expect(flattenArray(nums)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
