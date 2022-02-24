/*
 * @title: Matrix word search
 * @description: Trie - Find words from dictionary in matrix
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Node {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.isLast = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        current.children[letter] = new Node(letter);
      }
      current = current.children[letter];
    }
    current.isLast = true;
  }
}

const rowNums = [-1, 0, 0, 1];
const colNums = [0, -1, 1, 0];

function isValid(row, column, rowLength, columnLength) {
  return row >= 0 && row < rowLength && column >= 0 && column < columnLength;
}

const dfs = (matrix, row, column, visited, node, output, result) => {
  const letter = matrix[row][column];
  if (!node.children[letter]) return;
  node = node.children[letter];
  output.push(letter);
  if (node.isLast) {
    const word = output.join('');
    if (result.indexOf(word) === -1) {
      result.push(word);
    }
  }
  visited[row][column] = true;
  for (let i = 0; i < 4; i++) {
    const nextRow = row + rowNums[i];
    const nextColumn = column + colNums[i];

    if (isValid(nextRow, nextColumn, matrix.length, matrix[0].length)
      && !visited[nextRow][nextColumn]) {
      dfs(matrix, nextRow, nextColumn, visited, node, [...output], result);
    }
  }
  visited[row][column] = false;
};

const findWords = (matrix, words) => {
  const result = [];
  if (!matrix || !words || matrix.length < 1) {
    return result;
  }

  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      visited[i][j] = false;
    }
  }

  const trie = new Trie();
  words.forEach(word => trie.insert(word));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      dfs(matrix, i, j, visited, trie.root, [], result);
    }
  }

  return result;
};

// npx jest algorithms/matrix/matrix.wordsearch.all.two.js
test('findWords()', () => {
  const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v'],
  ];
  const words = ['oath', 'pea', 'eat', 'rain'];
  expect(findWords(board, words)).toEqual(
    ['oath', 'eat'],
  );
});
