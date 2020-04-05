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

test('utils.wrap', () => {
  const errorFunction = wrap(() => {
    throw new Error('Error');
  });

  const resultFunction = wrap(() => 'Foo');

  expect(errorFunction && errorFunction()).toBeNull();
  expect(resultFunction && resultFunction()).toEqual('Foo');
});
