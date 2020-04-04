/*
 * @title: Deep Clone
 * @description: Simple Class for deep cloning objects
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function clone(obj) {
  if (obj === null || typeof obj !== 'object' || obj === undefined) return obj;

  let copy;

  // Date Object
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Array Object
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Object
  if (obj instanceof Object) {
    copy = {};
    /* eslint-disable-next-line */
    for (const prop in obj) {
      /* eslint-disable-next-line */
      if (obj.hasOwnProperty(prop)) copy[prop] = clone(obj[prop]);
    }

    return copy;
  }

  throw new Error('clone failed...');
}

// example
const obj = {
  name: 'john',
  init: function () { console.log('init()'); },
  something: { year: 2017 },
  enabled: false,
};
console.log(obj);
const newObj = clone(obj);
console.log(newObj);

test.skip('skip', () => {});
