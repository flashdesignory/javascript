/*
 * @title: Deep Freeze
 * @description: deep freeze of obj
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object' || obj === undefined) return obj;

  const props = Object.getOwnPropertyNames(obj);

  for (let i = 0; i < props.length; i++) {
    const key = props[i];
    const value = obj[key];

    obj[key] = value && typeof value === 'object' ? deepFreeze(value) : value;
  }

  return Object.freeze(obj);
}

function freeze(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  /* eslint-disable-next-line */
  for (const prop in obj) {
    /* eslint-disable-next-line */
    if (obj.hasOwnProperty(prop)) obj[prop] = freeze(obj[prop]);
  }

  return Object.freeze(obj);
}

test('utils.deepfreeze', () => {
  const obj = {
    name: 'foo',
    data: [1, 2, 3, 4, 5],
    meta: {
      text: 'fooball',
    },
  };

  const expected = {
    name: 'foo',
    data: [1, 2, 3, 4, 5],
    meta: {
      text: 'fooball',
      tags: 'yoyoyo',
    },
  };

  obj.meta.tags = 'yoyoyo';
  deepFreeze(obj);
  obj.meta.something = 'ja';
  obj.bar = 'baz';

  expect(obj).toEqual(expected);
});

test('utils.freeze', () => {
  const obj = {
    name: 'foo',
    data: [1, 2, 3, 4, 5],
    meta: {
      text: 'fooball',
    },
  };

  const expected = {
    name: 'foo',
    data: [1, 2, 3, 4, 5],
    meta: {
      text: 'fooball',
    },
  };

  freeze(obj);
  obj.meta.something = 'ja';
  obj.bar = 'baz';
  expect(obj).toEqual(expected);
});
