/*
 * @title: Rotate Matrix
 * @description: various functions to find a value
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 Given an n x n matrix and a number x, find position of x in the matrix if it is present in it.
 Else print “Not Found”. In the given matrix, every row and column is sorted in increasing order.
 The designed algorithm should have linear time complexity.
 */

function findPosition(matrix, num) {
  if (!matrix.length || !matrix[0].length) return false;
  // start right top to let bottom
  let row = 0;
  let column = matrix.length - 1;
  while (row < matrix.length && column >= 0) {
    if (matrix[row][column] === num) {
      return [row, column];
    }

    if (matrix[row][column] > num) {
      column--;
    } else {
      row++;
    }
  }
  return [];
}

/* Given a sorted matrix mat[n][m] and an element ‘x’.
 Find position of x in the matrix if it is present, else print -1.
 Matrix is sorted in a way such that all elements in a row are sorted
 in increasing order and for row ‘i’, where 1 <= i <= n-1, first
 element of row 'i' is greater than or equal to the last element of
 row 'i-1'. The approach should have O(log n + log m) time complexity. */

// diagonal binary search
function searchMatrix(matrix, num) {
  // start left bottom to right top
  let row = matrix.length - 1;
  let column = 0;

  while (row >= 0 && column <= matrix[0].length - 1) {
    if (matrix[row][column] === num) {
      console.log(`found in row: ${row}, column: ${column}`);
      return [row, column];
    }
    if (matrix[row][column] < num) {
      column += 1;
    } else if (matrix[row][column] > num) {
      row -= 1;
    }
  }
  return [];
}

// select middle two rows and evaluate
function binarySearch(matrix, row, left, right, num) {
  let middle;
  while (left <= right) {
    middle = (left + right) / 2;
    if (matrix[row][middle] === num) {
      console.log(`found in row: ${row}, column: ${middle}`);
      return [row, middle];
    }
    if (matrix[row][middle] > num) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return [];
}

function binaryMatrixSearch(matrix, num) {
  const rowLength = matrix.length; // row length
  const columnLength = matrix[0].length; // col length;

  // single row - perform bs on row
  if (rowLength === 1) {
    return binarySearch(matrix, 0, 0, columnLength - 1, num);
  }

  // bs on middle row and column.
  // if num not found, we have two rows to search after
  let minRow = 0;
  let maxRow = rowLength - 1;
  const middleColumn = Math.floor(columnLength / 2);

  while ((minRow + 1) < maxRow) { // left <= right ????
    const middleRow = (minRow + maxRow) / 2;
    if (matrix[middleRow][middleColumn] === num) {
      console.log(`found in row: ${middleRow}, column: ${middleColumn}`);
      return [middleRow, middleColumn];
    }
    if (matrix[middleRow][middleColumn] > num) {
      maxRow = middleRow;
    } else {
      minRow = middleRow;
    }
  }

  // check remaining two rows
  // if element is in middle column of those two rows
  if (matrix[minRow][middleColumn] === num) {
    console.log(`found in row: ${minRow}, column: ${middleColumn}`);
    return [minRow, middleColumn];
  }
  if (matrix[maxRow][middleColumn] === num) {
    console.log(`found in row: ${maxRow}, column: ${middleColumn}`);
    return [maxRow, middleColumn];
  }
  if (num <= matrix[minRow][middleColumn - 1]) { // search first half of min row
    return binarySearch(matrix, minRow, 0, middleColumn - 1, num);
  }
  if (num >= matrix[minRow][middleColumn + 1]
    && num <= matrix[minRow][columnLength - 1]) { // search second half of min row
    return binarySearch(matrix, minRow, middleColumn + 1, columnLength - 1, num);
  }
  if (num <= matrix[maxRow][middleColumn - 1]) { // search first half of max row
    return binarySearch(matrix, maxRow, 0, middleColumn - 1, num);
  }
  if (num >= matrix[maxRow][middleColumn + 1]
    && num <= matrix[maxRow][columnLength - 1]) { // search second half of max row
    return binarySearch(matrix, maxRow, middleColumn + 1, columnLength - 1, num);
  }

  return [];
}

// npx jest algorithms/matrix/matrix.find.js
describe('binary search for matrix', () => {
  test('findPosition()', () => {
    const matrix = [
      [10, 20, 30, 40],
      [15, 25, 35, 45],
      [27, 29, 37, 48],
      [32, 33, 39, 50],
    ];

    expect(findPosition(matrix, 29)).toEqual([2, 1]);
  });
  test('searchMatrix()', () => {
    const matrix = [
      [1, 5, 9],
      [14, 20, 21],
      [30, 34, 43],
    ];

    expect(searchMatrix(matrix, 14)).toEqual([1, 0]);
  });
  test('binaryMatrixSearch()', () => {
    const matrix = [
      [1, 5, 9],
      [14, 20, 21],
      [30, 34, 43],
    ];

    expect(binaryMatrixSearch(matrix, 14)).toEqual([1, 0]);
  });
});
