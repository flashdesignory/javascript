/*
 * @title: Matrix word search
 * @description: Find words from dictionary in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const rowNum = [-1, -1, -1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1, -1, 1, -1, 0, 1];

function dictionaryContains(str) {
  const dictionary = ['GEEKS', 'FOR', 'QUIZ', 'GO'];
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].indexOf(str) === 0 && str.length === dictionary[i].length) {
      return true;
    }
  }
  return false;
}

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

function dfs(matrix, row, col, visited, current, result) {
  visited[row][col] = true;
  current += matrix[row][col];
  if (dictionaryContains(current)) {
    result.push(current);
  }

  for (let i = 0; i < 8; i++) {
    const nextRow = row + rowNum[i];
    const nextCol = col + colNum[i];

    if (isValid(nextRow, nextCol, matrix.length, matrix[0].length) && !visited[nextRow][nextCol]) {
      dfs(matrix, nextRow, nextCol, visited, current, result);
    }
  }


  visited[row][col] = false;
  current = current.substr(0, current.length - 1);
}

function findWords(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const current = '';
  const result = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (!visited[i][j]) {
        dfs(matrix, i, j, visited, current, result);
      }
    }
  }

  return result;
}

// npx jest algorithms/matrix/matrix.wordsearch.js
test('findWords()', () => {
  const words = [
    ['G', 'I', 'Z'],
    ['U', 'E', 'K'],
    ['Q', 'S', 'E']];

  expect(findWords(words)).toEqual(
    ['GEEKS', 'QUIZ'],
  );
});
