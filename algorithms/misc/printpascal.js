/*
 * @title: Print Pascal Triangle
 * @description: console.log Pascal triangle
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pascalTriangle(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = [];
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        result[i][j] = 1;
      } else {
        result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
      }
    }
  }

  return result;
}

/*
 Alternate approach - add previous rows together
  1 2 1 0
+ 0 1 2 1
  -------
  1 3 3 1
*/

function calculatePascal(numRows) {
  if (!numRows || numRows <= 0) return [];

  const result = [[1]];
  for (let i = 1; i < numRows; i++) {
    const prevRow = result[result.length - 1];
    const shiftLeft = [...prevRow, 0];
    const shiftRight = [0, ...prevRow];

    const currentRow = [];
    for (let j = 0; j < shiftLeft.length; j++) {
      currentRow.push(shiftLeft[j] + shiftRight[j]);
    }
    result.push(currentRow);
  }

  return result;
}

// npx jest algorithms/misc/printpascal.js
test('print pascal triangle', () => {
  expect(pascalTriangle(6)).toEqual([
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
    [1, 5, 10, 10, 5, 1],
  ]);
});

test('calculate pascal triangle', () => {
  expect(calculatePascal(6)).toEqual([
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
    [1, 5, 10, 10, 5, 1],
  ]);
});
