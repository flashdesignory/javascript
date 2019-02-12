/*
 * @title: Multiplication table
 * @description: print out a simple multiplication table with a range of cols.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */


function printMultiplicationTable(start, end) {
  const numRows = (end - start) + 1;
  const numColumns = numRows;
  const result = [];

  for (let i = 0; i < numRows; i++) {
    result[i] = [];
    for (let j = 0; j < numColumns; j++) {
      result[i][j] = (i + start) * (j + start);
    }
  }

  return result;
}

// npx jest algorithms/number.multiplication.js
test('printMultiplicationTable()', () => {
  expect(printMultiplicationTable(3, 5)).toEqual([[9, 12, 15], [12, 16, 20], [15, 20, 25]]);
});
