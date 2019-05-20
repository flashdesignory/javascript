/*
 * @title: Pascal Triangle Row
 * @description: return nth row of pascal triangle
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function getRow(rowIndex) {
  if (rowIndex === 0) {
    return [1];
  }
  if (rowIndex === 1) {
    return [1, 1];
  }

  const previousRow = getRow(rowIndex - 1);
  for (let i = 0; i < previousRow.length - 1; i++) {
    previousRow[i] += previousRow[i + 1];
  }
  previousRow.unshift(1);
  return previousRow;
}

getRow(4);

// npx jest algorithms/misc/printpascal2.js
test('get row of pascal triangle', () => {
  expect(getRow(5)).toEqual([1, 5, 10, 10, 5, 1]);
});
