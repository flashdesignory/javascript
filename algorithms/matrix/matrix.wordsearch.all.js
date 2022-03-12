/*
 * @title: Matrix word search
 * @description: Find words from dictionary in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const isValid = (row, column, numRows, numColumns) => row >= 0
  && row < numRows
  && column >= 0
  && column < numColumns;

const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const dictionaryContains = (dictionary, str) => {
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].indexOf(str) === 0 && str.length === dictionary[i].length) {
      return true;
    }
  }

  return false;
};

const dfs = (matrix, row, column, visited, dictionary, current, result) => {
  visited[row][column] = true;
  current += matrix[row][column];

  if (dictionaryContains(dictionary, current)) {
    if (result.indexOf(current) === -1) {
      result.push(current);
    }
  }

  for (let i = 0; i < directions.length; i++) {
    const nextRow = row + directions[i][0];
    const nextColumn = column + directions[i][1];

    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
       && !visited[nextRow][nextColumn]) {
      dfs(matrix, nextRow, nextColumn, visited, dictionary, current, result);
    }
  }


  visited[row][column] = false;
};

const findWords = (matrix, dictionary) => {
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const result = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!visited[i][j]) {
        dfs(matrix, i, j, visited, dictionary, '', result);
      }
    }
  }

  return result;
};

// npx jest algorithms/matrix/matrix.wordsearch.all.js
test('findWords()', () => {
  const dictionary = [
    'GEEKS',
    'FOR',
    'QUIZ',
    'GO',
  ];

  const words = [
    ['G', 'I', 'Z'],
    ['U', 'E', 'K'],
    ['Q', 'S', 'E']];

  expect(findWords(words, dictionary)).toEqual(
    ['GEEKS', 'QUIZ'],
  );
});
