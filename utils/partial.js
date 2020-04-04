/*
 * @title: Partial
 * @description: partial apply function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function partial(fn) {
  const args = Array.prototype.slice.call(arguments, 1); //eslint-disable-line
  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0), //eslint-disable-line
    ));
  };
}

function partialTwo(fn, ...args) {
  return function (...more) {
    return fn.apply(this, [...args, ...more]);
  };
}

test('utils.partial', () => {
  const multiply = (a, b) => a * b;
  const double = partial(multiply, 2);
  expect(double(3)).toEqual(6);
});

test('utils.partial', () => {
  const multiply = (a, b) => a * b;
  const double = partialTwo(multiply, 2);
  expect(double(3)).toEqual(6);
});
