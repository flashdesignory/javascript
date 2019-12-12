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

const obj1 = {
  name: 'foo',
  data: [1, 2, 3, 4, 5],
  meta: {
    text: 'fooball',
  },
};

console.log(obj1);
console.log('***********');
obj1.meta.tags = 'yoyoyo';
console.log(obj1);
console.log('***********');
deepFreeze(obj1);
obj1.meta.something = 'ja';
console.log(obj1);
obj1.bar = 'baz';
console.log(obj1);

const obj2 = {
  name: 'foo',
  data: [1, 2, 3, 4, 5],
  meta: {
    text: 'fooball',
  },
};

console.log(obj2);
console.log('***********');
obj2.meta.tags = 'yoyoyo';
console.log(obj2);
console.log('***********');
freeze(obj2);
obj2.meta.something = 'ja';
console.log(obj2);
obj2.bar = 'baz';
console.log(obj2);
