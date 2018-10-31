/*
 * @title: Queens are safe?
 * @description: Queens problem
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function solve(n) {
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

console.log(solve(8));
console.log('************************');
/** ********************************* */
function queenPuzzle(rows, columns) {
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
  const prev = queenPuzzle(newRow, columns);
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

console.log(queenPuzzle(8, 8));
