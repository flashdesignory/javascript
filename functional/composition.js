/*
 * @title: function composition
 * @description: Examples of function composition
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pipe(...fns) {
  return function (result) {
    for (let i = 0; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };
}

function compose(...fns) {
  return pipe(...fns.reverse());
}

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

// npx jest functional/composition.js
describe('it should compose functions', () => {
  const increment = x => x + 1;
  const decrement = x => x - 1;
  const double = x => x * 2;
  const half = x => x / 2;

  it('should execute functions left to right', () => {
    const f = compose(decrement, double, increment, half);
    expect(f(3)).toBe(4);
  });

  it('should execute functions right to left', () => {
    const p = pipe(half, increment, double, decrement);
    expect(p(3)).toBe(4);
  });

  it('should call all functions with the same arguments', () => {
    const one = jest.fn();
    const two = jest.fn();
    const three = jest.fn();

    callAll(one, two, three)('some arg');
    expect(one).toHaveBeenCalledWith('some arg');
    expect(two).toHaveBeenCalledWith('some arg');
    expect(three).toHaveBeenCalledWith('some arg');
  });
});
