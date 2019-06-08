/*
 * @title: compress array
 * @description: Simple function to compress an array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  * input: [1, 2, 3, 10, 25, 26, 30, 31, 32, 33];
  * output: '1-3,10,25-26,30-33'
  */

function compressArray(arr) {
  const result = [];
  if (arr.length === 0) return result;

  let start = 0;
  let end = start;

  // notice that we loop one additional time
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] === arr[end] + 1) {
      end++;
    } else {
      if (start === end) {
        result.push(`${arr[start]}`);
      } else {
        result.push(`${arr[start]}-${arr[end]}`);
      }
      start = i;
      end = start;
    }
  }

  return result.join(',').toString();
}

// npx jest algorithms/array/array.compress.js
test('compressArray()', () => {
  expect(compressArray([1, 2, 3, 10, 25, 26, 30, 31, 32, 33]))
    .toEqual('1-3,10,25-26,30-33');
});
