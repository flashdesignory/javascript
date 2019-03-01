/*
 * @title: Print Steps
 * @description: console.log # for each step
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function printSteps(n) {
  for (let i = 0; i < n; i++) {
    let result = '';
    for (let j = 0; j < n; j++) {
      if (j <= i) {
        result += '#';
      } else {
        result += ' ';
      }
    }
    console.log(result);
  }
}

function steps(n, index = 0, result = '') {
  if (index === n) {
    return;
  }

  if (result.length === n) {
    console.log(result);
    steps(n, index + 1, '');
    return;
  }

  if (result.length <= index) {
    result += '#';
  } else {
    result += ' ';
  }

  steps(n, index, result);
}

// npx jest algorithms/misc/printsteps.js
beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  console.log.mockRestore();
});

test('iterative print steps - console.log # signs', () => {
  printSteps(3);
  expect(console.log.mock.calls[0][0]).toEqual('#  ');
  expect(console.log.mock.calls[1][0]).toEqual('## ');
  expect(console.log.mock.calls[2][0]).toEqual('###');
  expect(console.log.mock.calls.length).toEqual(3);
});

test('recursive print steps - console.log # signs', () => {
  steps(3);
  expect(console.log.mock.calls[0][0]).toEqual('#  ');
  expect(console.log.mock.calls[1][0]).toEqual('## ');
  expect(console.log.mock.calls[2][0]).toEqual('###');
  expect(console.log.mock.calls.length).toEqual(3);
});
