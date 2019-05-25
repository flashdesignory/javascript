/*
 * @title: Most Stones Removed with Same Row or Column
 * @description: On a 2D plane, we place stones at some integer coordinate points.
 * Each coordinate point may have at most one stone.
 * A move consists of removing a stone that shares a column or row with another stone on the grid.
 * What is the largest possible number of moves we can make?
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function dfs(rows, columns, row, column, visited) {
  const currentColumns = rows[row];
  const currentRows = columns[column];

  for (let i = 0; i < currentColumns.length; i++) {
    const nextColumn = currentColumns[i];
    const key = `${row},${nextColumn}`;
    if (!visited[key]) {
      visited[key] = true;
      dfs(rows, columns, row, nextColumn, visited);
    }
  }
  for (let i = 0; i < currentRows.length; i++) {
    const nextRow = currentRows[i];
    const key = `${nextRow},${column}`;
    if (!visited[key]) {
      visited[key] = true;
      dfs(rows, columns, nextRow, column, visited);
    }
  }
}

function removeStones(stones) {
  const rows = {};
  const columns = {};

  for (let i = 0; i < stones.length; i++) {
    const [row, column] = stones[i];
    if (!rows[row]) {
      rows[row] = [];
    }
    if (!columns[column]) {
      columns[column] = [];
    }
    rows[row].push(column);
    columns[column].push(row);
  }

  const visited = {};
  let numConnected = 0;

  for (let i = 0; i < stones.length; i++) {
    const [row, column] = stones[i];
    const key = `${row},${column}`;
    if (!visited[key]) {
      dfs(rows, columns, row, column, visited);
      numConnected += 1;
    }
  }

  return stones.length - numConnected;
}

// npx jest algorithms/matrix/matrix.stones.js
test('most stones removed', () => {
  const stones = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]];
  expect(removeStones(stones)).toEqual(5);
});
