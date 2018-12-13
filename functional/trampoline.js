function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);

    while (typeof result === 'function') {
      result = result();
    }

    return result;
  };
}

const sum = trampoline(function fn(sum, num, ...nums) { // eslint-disable-line
  sum += num;
  if (nums.length === 0) return sum;
  return function () {
    return fn(sum, ...nums);
  };
});

// npx jest functional/trampoline.js
it('trampoline()', () => {
  expect(sum(3, 4, 5, 6, 7, 8, 9)).toEqual(42);
});
