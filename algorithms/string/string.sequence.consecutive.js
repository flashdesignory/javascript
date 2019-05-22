/*
 * @title: Longest Consecutive Subsequence
 * @description: unordered array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function lcis(arr) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = true;
  }

  let end;
  let start;
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i] - 1]) {
      end = arr[i];
      start = arr[i];

      while (map[end + 1]) {
        end++;
      }

      max = Math.max((end - start + 1), max);
    }
  }

  return max;
}

// npx jest algorithms/string/string.sequence.consecutive.js
test('lcis()', () => {
  expect(lcis([1, 563, 585, 571, 90, 92, 94, 93, 91, 45])).toEqual(5);
  expect(lcis([100, 4, 200, 1, 3, 2])).toEqual(4);
  expect(lcis([4, 2, 1, 20])).toEqual(2);
  expect(lcis([2, 4, 3])).toEqual(3);
});
