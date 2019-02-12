/*
 * @title: Queens are safe?
 * @description: Queens problem
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function queenPuzzleOne(n) {
  const result = [];
  function solver(current) {
    if (current.length === n) {
      result.push(current);
    } else {
      for (let i = 0; i < n; i++) {
        let j; let l;
        for (j = 0, l = current.length; j < l; j++) {
          const prev = current[j];
          if (prev === i) { break; }
          if (prev - (l - j) === i) { break; }
          if (prev + (l - j) === i) { break; }
        }
        if (j === l) {
          solver(current.concat([i]));
        }
      }
    }
  }
  solver([]);
  return result;
}

/** ********************************* */
function queenPuzzleTwo(rows, columns) {
  if (rows <= 0) {
    return [[]];
  }
  return addQueen(rows - 1, columns); //eslint-disable-line
}

function hasConflict(newRow, newColumn, solution) {
  for (let i = 0; i < newRow; i++) {
    if (solution[i] === newColumn
            || solution[i] + i === newColumn + newRow
            || solution[i] - i === newColumn - newRow) {
      return true;
    }
  }
  return false;
}

function addQueen(newRow, columns) {
  const newSolutions = [];
  const prev = queenPuzzleTwo(newRow, columns);
  for (let i = 0; i < prev.length; i++) {
    const solution = prev[i];
    for (let newColumn = 0; newColumn < columns; newColumn++) {
      if (!hasConflict(newRow, newColumn, solution)) {
        newSolutions.push(solution.concat([newColumn]));
      }
    }
  }
  return newSolutions;
}

const result = [
  [0, 4, 7, 5, 2, 6, 1, 3],
  [0, 5, 7, 2, 6, 3, 1, 4],
  [0, 6, 3, 5, 7, 1, 4, 2],
  [0, 6, 4, 7, 1, 3, 5, 2],
  [1, 3, 5, 7, 2, 0, 6, 4],
  [1, 4, 6, 0, 2, 7, 5, 3],
  [1, 4, 6, 3, 0, 7, 5, 2],
  [1, 5, 0, 6, 3, 7, 2, 4],
  [1, 5, 7, 2, 0, 3, 6, 4],
  [1, 6, 2, 5, 7, 4, 0, 3],
  [1, 6, 4, 7, 0, 3, 5, 2],
  [1, 7, 5, 0, 2, 4, 6, 3],
  [2, 0, 6, 4, 7, 1, 3, 5],
  [2, 4, 1, 7, 0, 6, 3, 5],
  [2, 4, 1, 7, 5, 3, 6, 0],
  [2, 4, 6, 0, 3, 1, 7, 5],
  [2, 4, 7, 3, 0, 6, 1, 5],
  [2, 5, 1, 4, 7, 0, 6, 3],
  [2, 5, 1, 6, 0, 3, 7, 4],
  [2, 5, 1, 6, 4, 0, 7, 3],
  [2, 5, 3, 0, 7, 4, 6, 1],
  [2, 5, 3, 1, 7, 4, 6, 0],
  [2, 5, 7, 0, 3, 6, 4, 1],
  [2, 5, 7, 0, 4, 6, 1, 3],
  [2, 5, 7, 1, 3, 0, 6, 4],
  [2, 6, 1, 7, 4, 0, 3, 5],
  [2, 6, 1, 7, 5, 3, 0, 4],
  [2, 7, 3, 6, 0, 5, 1, 4],
  [3, 0, 4, 7, 1, 6, 2, 5],
  [3, 0, 4, 7, 5, 2, 6, 1],
  [3, 1, 4, 7, 5, 0, 2, 6],
  [3, 1, 6, 2, 5, 7, 0, 4],
  [3, 1, 6, 2, 5, 7, 4, 0],
  [3, 1, 6, 4, 0, 7, 5, 2],
  [3, 1, 7, 4, 6, 0, 2, 5],
  [3, 1, 7, 5, 0, 2, 4, 6],
  [3, 5, 0, 4, 1, 7, 2, 6],
  [3, 5, 7, 1, 6, 0, 2, 4],
  [3, 5, 7, 2, 0, 6, 4, 1],
  [3, 6, 0, 7, 4, 1, 5, 2],
  [3, 6, 2, 7, 1, 4, 0, 5],
  [3, 6, 4, 1, 5, 0, 2, 7],
  [3, 6, 4, 2, 0, 5, 7, 1],
  [3, 7, 0, 2, 5, 1, 6, 4],
  [3, 7, 0, 4, 6, 1, 5, 2],
  [3, 7, 4, 2, 0, 6, 1, 5],
  [4, 0, 3, 5, 7, 1, 6, 2],
  [4, 0, 7, 3, 1, 6, 2, 5],
  [4, 0, 7, 5, 2, 6, 1, 3],
  [4, 1, 3, 5, 7, 2, 0, 6],
  [4, 1, 3, 6, 2, 7, 5, 0],
  [4, 1, 5, 0, 6, 3, 7, 2],
  [4, 1, 7, 0, 3, 6, 2, 5],
  [4, 2, 0, 5, 7, 1, 3, 6],
  [4, 2, 0, 6, 1, 7, 5, 3],
  [4, 2, 7, 3, 6, 0, 5, 1],
  [4, 6, 0, 2, 7, 5, 3, 1],
  [4, 6, 0, 3, 1, 7, 5, 2],
  [4, 6, 1, 3, 7, 0, 2, 5],
  [4, 6, 1, 5, 2, 0, 3, 7],
  [4, 6, 1, 5, 2, 0, 7, 3],
  [4, 6, 3, 0, 2, 7, 5, 1],
  [4, 7, 3, 0, 2, 5, 1, 6],
  [4, 7, 3, 0, 6, 1, 5, 2],
  [5, 0, 4, 1, 7, 2, 6, 3],
  [5, 1, 6, 0, 2, 4, 7, 3],
  [5, 1, 6, 0, 3, 7, 4, 2],
  [5, 2, 0, 6, 4, 7, 1, 3],
  [5, 2, 0, 7, 3, 1, 6, 4],
  [5, 2, 0, 7, 4, 1, 3, 6],
  [5, 2, 4, 6, 0, 3, 1, 7],
  [5, 2, 4, 7, 0, 3, 1, 6],
  [5, 2, 6, 1, 3, 7, 0, 4],
  [5, 2, 6, 1, 7, 4, 0, 3],
  [5, 2, 6, 3, 0, 7, 1, 4],
  [5, 3, 0, 4, 7, 1, 6, 2],
  [5, 3, 1, 7, 4, 6, 0, 2],
  [5, 3, 6, 0, 2, 4, 1, 7],
  [5, 3, 6, 0, 7, 1, 4, 2],
  [5, 7, 1, 3, 0, 6, 4, 2],
  [6, 0, 2, 7, 5, 3, 1, 4],
  [6, 1, 3, 0, 7, 4, 2, 5],
  [6, 1, 5, 2, 0, 3, 7, 4],
  [6, 2, 0, 5, 7, 4, 1, 3],
  [6, 2, 7, 1, 4, 0, 5, 3],
  [6, 3, 1, 4, 7, 0, 2, 5],
  [6, 3, 1, 7, 5, 0, 2, 4],
  [6, 4, 2, 0, 5, 7, 1, 3],
  [7, 1, 3, 0, 6, 4, 2, 5],
  [7, 1, 4, 2, 0, 6, 3, 5],
  [7, 2, 0, 5, 1, 4, 6, 3],
  [7, 3, 0, 2, 5, 1, 6, 4]];

// npx jest algorithms/matrix/matrix.queens.js
test('queens solutions', () => {
  expect(queenPuzzleOne(8)).toEqual(result);
});

test('queenPuzzleTwo', () => {
  expect(queenPuzzleTwo(8, 8)).toEqual(result);
});
