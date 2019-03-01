/*
 * @title: Print Pyramid
 * @description: console.log a pyramid shape
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pyramid(n) {
  const middle = Math.floor((2 * n - 1) / 2);
  const numColumns = 2 * n - 1;

  for (let row = 0; row < n; row++) {
    let result = '';
    for (let column = 0; column < numColumns; column++) {
      const left = middle - row;
      const right = middle + row;
      if (left <= column && right >= column) {
        result += '#';
      } else {
        result += ' ';
      }
    }
    console.log(result);
  }
}

function pyramidRecursive(n, row = 0, result = '') {
  if (row === n) return;

  const numColumns = 2 * n - 1;
  if (result.length === numColumns) {
    console.log(result);
    pyramidRecursive(n, row + 1, '');
    return;
  }

  const middle = Math.floor(numColumns / 2);
  const left = middle - row;
  const right = middle + row;
  let char;
  if (left <= result.length && right >= result.length) {
    char = '#';
  } else {
    char = ' ';
  }

  pyramidRecursive(n, row, result + char);
}

// npx jest algorithms/misc/printpyramid.js
beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  console.log.mockRestore();
});


test('iterative print pyramid - console.log # signs', () => {
  pyramid(3);
  expect(console.log.mock.calls[0][0]).toEqual('  #  ');
  expect(console.log.mock.calls[1][0]).toEqual(' ### ');
  expect(console.log.mock.calls[2][0]).toEqual('#####');
  expect(console.log.mock.calls.length).toEqual(3);
});

test('recursive print pyramid - console.log # signs', () => {
  pyramidRecursive(3);
  expect(console.log.mock.calls[0][0]).toEqual('  #  ');
  expect(console.log.mock.calls[1][0]).toEqual(' ### ');
  expect(console.log.mock.calls[2][0]).toEqual('#####');
  expect(console.log.mock.calls.length).toEqual(3);
});
