/*
 * @title: Minesweeper
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 * @description:
 * You are given an m x n char matrix board representing the game board where:

    'M' represents an unrevealed mine,
    'E' represents an unrevealed empty square,
    'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
    digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
    'X' represents a revealed mine.

  You are also given an integer array click where click = [clickr, clickc] represents the next click position among all the unrevealed squares ('M' or 'E').

  Return the board after revealing this position according to the following rules:

    If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
    If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed blank 'B' and all of its adjacent unrevealed squares should be revealed recursively.
    If an empty square 'E' with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
    Return the board when no more squares will be revealed.
 */

/**
 * BREADTH FIRST SEARCH
 */

/**
 * @param {character[][]} matrix
 * @param {number[]} position
 * @return {character[][]}
 */

 const dfs = (row, column, matrix) => {
    if (!matrix[row][column]) return;
    if (matrix[row][column] === 'M') {
      matrix[row][column] = 'X';
      return;
    }
    if (matrix[row][column] !== 'E') return;
  
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    let mines = 0;
    for (let i = Math.max(row - 1, 0); i < Math.min(row + 2, numRows); i++) {
      for (let j = Math.max(column - 1, 0); j < Math.min(column + 2, numCols); j++) {
        if (matrix[i][j] === 'M') mines++;
      }
    }
  
    if (mines) {
      matrix[row][column] = mines.toString();
      return;
    } else {
      matrix[row][column] = 'B';
      for (let i = Math.max(row - 1, 0); i < Math.min(row + 2, numRows); i++) {
        for (let j = Math.max(column - 1, 0); j < Math.min(column + 2, numCols); j++) {
          dfs(i, j, matrix);
        }
      }
    }
  }
  
  const updateBoard = (board, click) => {
    dfs(click[0], click[1], board);
    return board;
  }
  
  // npx jest algorithms/misc/minesweeper.two.js
  test("example-one", async function() {
    const board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]];
    const click = [3,0];
    const output = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]];
  
    expect(updateBoard(board, click)).toEqual(output);
  });
  
  test("example-two", async function() {
    const board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]];
    const click = [1,2];
    const output = [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]];
  
    expect(updateBoard(board, click)).toEqual(output);
  });
  