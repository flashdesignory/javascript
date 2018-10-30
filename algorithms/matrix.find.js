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

const matrixOne = [
  [10, 20, 30, 40],
  [15, 25, 35, 45],
  [27, 29, 37, 48],
  [32, 33, 39, 50],
];

function findPosition(matrix, num) {
  let i = 0;
  let j = matrix.length - 1;
  console.log(matrix[i][j]);
  while (i < matrix.length && j >= 0) {
    if (matrix[i][j] === num) {
      return [i, j];
    }

    if (matrix[i][j] > num) {
      j--;
    } else {
      i++;
    }
  }
  return [];
}

findPosition(matrixOne, 29); // [2,1];


/* Given a sorted matrix mat[n][m] and an element ‘x’.
 Find position of x in the matrix if it is present, else print -1.
 Matrix is sorted in a way such that all elements in a row are sorted
 in increasing order and for row ‘i’, where 1 <= i <= n-1, first
 element of row 'i' is greater than or equal to the last element of
 row 'i-1'. The approach should have O(log n + log m) time complexity. */

const matrixTwo = [
  [1, 5, 9],
  [14, 20, 21],
  [30, 34, 43],
];

function binarySearch(matrix, row, left, right, num) {
  let middle;
  while (left <= right) {
    middle = (left + right) / 2;
    if (matrix[row][middle] === num) {
      console.log(`found in row: ${row}, column: ${middle}`);
      return;
    }

    if (matrix[row][middle] > num) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
}

function binaryMatrixSearch(matrix, num) {
  const rowLength = matrix.length; // row length
  const columnLength = matrix[0].length; // col length;

  // single row - perform bs on row
  if (rowLength === 1) {
    binarySearch(matrix, 0, 0, columnLength - 1, num);
    return;
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
      return;
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
  } else if (matrix[maxRow][middleColumn] === num) {
    console.log(`found in row: ${maxRow}, column: ${middleColumn}`);
  } else if (num <= matrix[minRow][middleColumn - 1]) { // search first half of min row
    binarySearch(matrix, minRow, 0, middleColumn - 1, num);
  } else if (num >= matrix[minRow][middleColumn + 1]
    && num <= matrix[minRow][columnLength - 1]) { // search second half of min row
    binarySearch(matrix, minRow, middleColumn + 1, columnLength - 1, num);
  } else if (num <= matrix[maxRow][middleColumn - 1]) { // search first half of max row
    binarySearch(matrix, maxRow, 0, middleColumn - 1, num);
  } else if (num >= matrix[maxRow][middleColumn + 1]
    && num <= matrix[maxRow][columnLength - 1]) { // search second half of max row
    binarySearch(matrix, maxRow, middleColumn + 1, columnLength - 1, num);
  }
}

binaryMatrixSearch(matrixTwo, 14);

// recursive / diagonal
function searchMatrix(matrix, num) {
  // start left bottom to right top
  let row = matrix.length - 1;
  let column = 0;

  while (row >= 0 && column <= matrix[0].length - 1) {
    if (matrix[row][column] === num) {
      console.log(`found in row: ${row}, column: ${column}`);
      return true;
    }
    if (matrix[row][column] < num) {
      column += 1;
    } else if (matrix[row][column] > num) {
      row -= 1;
    }
  }
  return false;
}
searchMatrix(matrixTwo, 14);
