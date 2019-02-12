/*
 * @title: Rotate Matrix
 * @description: Simple function to rotate matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/* [ 1, 2, 3 ],
   [ 4, 5, 6 ],
   [ 7, 8, 9 ]

   [ 7, 4, 1 ],
   [ 8, 5, 2 ],
   [ 9, 6, 3 ] */

function rotateMatrixClockwise(arr) {
  console.log(arr);
  const n = arr.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - 1 - i; j++) {
      const temp = arr[i][j];
      arr[i][j] = arr[n - 1 - j][i];
      arr[n - 1 - j][i] = arr[n - 1 - i][n - 1 - j];
      arr[n - 1 - i][n - 1 - j] = arr[j][n - 1 - i];
      arr[j][n - 1 - i] = temp;
    }
  }
  return arr;
}

/* [ 1, 2, 3 ],
   [ 4, 5, 6 ],
   [ 7, 8, 9 ]

   [ 3, 6, 9 ],
   [ 2, 5, 8 ],
   [ 1, 4, 7 ] */

function rotateMatrixCounterClock(arr) {
  console.log(arr);
  const n = arr.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - 1 - i; j++) {
      const temp = arr[i][j];
      arr[i][j] = arr[j][n - 1 - i];
      arr[j][n - 1 - i] = arr[n - 1 - i][n - 1 - j];
      arr[n - 1 - i][n - 1 - j] = arr[n - 1 - j][i];
      arr[n - 1 - j][i] = temp;
    }
  }

  return arr;
}

// npx jest algorithms/matrix.rotate.js
describe('test matrix rotations', () => {
  test('matrix clockwise rotations', () => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(rotateMatrixClockwise(arr)).toEqual([
      [7, 4, 1], [8, 5, 2], [9, 6, 3],
    ]);
  });

  test('matrix counter clockwise rotations', () => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(rotateMatrixCounterClock(arr)).toEqual([
      [3, 6, 9], [2, 5, 8], [1, 4, 7],
    ]);
  });
});
