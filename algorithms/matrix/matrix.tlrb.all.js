/*
 * @title: TopLeftRightBottom
 * @description: all paths from top left to right bottom
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

function isValid(row, column, numRows, numCols) {
  return row >= 0 && row < numRows && column >= 0 && column < numCols;
}

function dfs(row, column, numRows, numCols, visited, count) {
  if (row === numRows - 1 && column === numCols - 1) {
    count++;
    return count;
  }

  visited[row][column] = true;

  for (let i = 0; i < 4; i++) {
    const nextRow = row + rowNum[i];
    const nextColumn = column + colNum[i];

    if (isValid(nextRow, nextColumn, numRows, numCols)
      && !visited[nextRow][nextColumn]) {
      count = dfs(nextRow, nextColumn, numRows, numCols, visited, count);
    }
  }

  visited[row][column] = false;
  return count;
}

function pathsTopLeftBottomRight(numRows, numCols) {
  const visited = [];
  for (let i = 0; i < numRows; i++) {
    visited[i] = [];
    for (let j = 0; j < numCols; j++) {
      visited[i][j] = false;
    }
  }

  const result = dfs(0, 0, numRows, numCols, visited, 0);
  return result;
}

// recursive
function pathsTopLeftBottomRightRestricted(numRows, numCols) {
  let result = 0;

  function traverse(row, column) {
    if (row === numRows - 1 && column === numCols - 1) {
      result++;
    } else {
      if (row < numRows - 1) traverse(row + 1, column);
      if (column < numCols - 1) traverse(row, column + 1);
    }
  }

  traverse(0, 0);

  return result;
}

// tabulation
function pathsTopLeftBottomRightRestricted2(m, n) {
  const result = [];
  for (let i = 0; i < m; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 0; i < m; i++) {
    result[i][0] = 1;
  }

  for (let i = 0; i < n; i++) {
    result[0][i] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      result[i][j] = result[i - 1][j] + result[i][j - 1];
    }
  }

  return result[m - 1][n - 1];
}

// npx jest algorithms/matrix/matrix.tlrb.all.js
test('paths top left right bottom', () => {
  expect(pathsTopLeftBottomRight(4, 4)).toEqual(184);
});

test('paths top left right bottom restricted', () => {
  expect(pathsTopLeftBottomRightRestricted(4, 4)).toEqual(20);
});

test('paths top left right bottom restricted 2', () => {
  expect(pathsTopLeftBottomRightRestricted2(4, 4)).toEqual(20);
});
