/*
 * @title:Spiral Matrix
 * @description: traverse matrix spiral
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function spiral(array) {
  if (array.length === 0) return [];
  const rows = array.length;
  const columns = array[0].length;
  let topIndex = 0;
  let bottomIndex = rows - 1;
  let leftIndex = 0;
  let rightIndex = columns - 1;

  const result = [];

  while (topIndex <= bottomIndex && leftIndex <= rightIndex) {
    // top
    for (let i = leftIndex; i <= rightIndex; i++) {
      result.push(array[topIndex][i]);
    }
    topIndex++;
    // right
    for (let i = topIndex; i <= bottomIndex; i++) {
      result.push(array[i][rightIndex]);
    }
    rightIndex--;
    // bottom
    if (topIndex <= bottomIndex) {
      for (let i = rightIndex; i >= leftIndex; i--) {
        result.push(array[bottomIndex][i]);
      }
    }
    bottomIndex--;
    // left
    if (leftIndex <= rightIndex) {
      for (let i = bottomIndex; i >= topIndex; i--) {
        result.push(array[i][leftIndex]);
      }
    }
    leftIndex++;
  }
  return result.join(',');
}

// npx jest algorithms/matrix/matrix.traverse.spiral.js
test('spiral()', () => {
  const matrix = [[1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]];

  expect(spiral(matrix)).toEqual('1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10');
});
