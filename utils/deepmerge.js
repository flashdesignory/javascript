/*
 * @title: Deep Merge
 * @description: Simple Class for deep merging objects
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const isObject = value => value === Object(value);

const deepMerge = (target, source) => {
  if (!isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

const mergeAll = function (...args) {
  const clone = {};
  args.forEach(arg => deepMerge(clone, arg));
  return clone;
};

// npx jest utils/deepmerge.js
test('utils.mergeAll', () => {
  const a = {
    error: null,
    loaded: true,
    ids: [1, 2, 3],
    flowProperties: {
      loaded: true,
      path: 'nothing',
    },
  };

  const b = {
    error: 'foo',
    flowProperties: {
      path: 'something',
      error: false,
    },
  };

  const expected = {
    error: 'foo',
    loaded: true,
    ids: [1, 2, 3],
    flowProperties: {
      loaded: true,
      path: 'something',
      error: false,
    },
  };

  expect(mergeAll(a, b)).toEqual(expected);
});
