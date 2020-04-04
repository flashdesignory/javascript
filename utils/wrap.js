/*
 * @title: Wrap Function Utils
 * @description: wrap a function and validate
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function wrap(fn) {
  return function () {
    try {
      return fn.call(this);
    } catch (e) {
      fn = function () { return null; };
      return null;
    }
  };
}

const errorFunction = wrap(() => {
  throw new Error('Error');
});

const resultFunction = wrap(() => 'Foo');

console.log(errorFunction && errorFunction());
console.log(resultFunction && resultFunction());

test.skip('skip', () => {});
