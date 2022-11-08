/*
 * @title: Update Nested Object
 * @description: Utility function that allows you to assign a new value with dot
 * notation to target nested object keys.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const clone = (obj) => {
  if (obj === null || typeof obj !== 'object' || obj === undefined) return obj;

  if (obj instanceof Date) {
    const copy = new Date();

    copy.setTime(obj.getTime());

    return copy;
  }

  if (Array.isArray(obj)) {
    const copy = [];

    /* eslint-disable-next-line */
    for (const [i, element] of obj.entries()) {
      copy[i] = clone(element);
    }

    return copy;
  }

  if (obj instanceof Object) {
    const copy = {};

    /* eslint-disable-next-line */
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) copy[prop] = clone(obj[prop]);
    }

    return copy;
  }

  /* istanbul ignore next */
  throw new Error('Clone operation failed');
};

const updateNestedObject = (key, value, obj) => {
  const keys = key.split('.');
  const lastKey = keys[keys.length - 1];

  const resultObject = clone(obj);
  let tempObject = resultObject;

  for (let i = 0; i <= keys.length - 1; i++) {
    const current = keys[i];

    if (Object.prototype.hasOwnProperty.call(tempObject, lastKey)) {
      tempObject[lastKey] = value;

      return resultObject;
    }

    tempObject = tempObject[current] !== undefined ? tempObject[current] : {};
  }

  return resultObject;
};

// npx jest utils/updateNestedObject.js
describe('updateNestedObject', () => {
  it('should assign value to a simple key', () => {
    const originalObject = { name: 'a' };
    const updatedObject = { name: 'b' };

    expect(updateNestedObject('name', 'b', originalObject)).toEqual(
      updatedObject,
    );
  });

  it('should assign a deeply nested key', () => {
    const originalObject = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      e: 4,
      f: {
        g: {
          h: {
            i: 'hello',
          },
        },
      },
    };

    const updatedObject = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      e: 4,
      f: {
        g: {
          h: {
            i: 'hi',
          },
        },
      },
    };

    expect(updateNestedObject('f.g.h.i', 'hi', originalObject)).toEqual(
      updatedObject,
    );

    // make sure original obj wasn't changed
    expect(originalObject).not.toEqual(updatedObject);
  });

  it('should assign a deeply nested key again', () => {
    const originalObject = {
      levelOne: {
        levelTwo: {
          someValue: 'hey',
          levelThree: {
            finalValue: 'yo',
          },
        },
      },
    };

    const updatedObject = {
      levelOne: {
        levelTwo: {
          someValue: 'hey',
          levelThree: false,
        },
      },
    };

    expect(
      updateNestedObject(
        'levelOne.levelTwo.levelThree',
        false,
        clone(originalObject),
      ),
    ).toEqual(updatedObject);
    // make sure original obj wasn't changed
    expect(originalObject).not.toEqual(updatedObject);
  });

  it('should return obj without updating if key is not existing', () => {
    const originalObject = {
      name: 'fuzz',
      password: 'abc123',
    };

    expect(updateNestedObject('f.g.h.i', 'hi', originalObject)).toEqual(
      originalObject,
    );
  });

  it('should return obj without updating if key is not existing ... still', () => {
    const originalObject = {
      name: 'fuzz',
      password: 'abc123',
      meta: {
        createdAt: 'some date',
      },
    };

    expect(updateNestedObject('meta.foo', 'hi', originalObject)).toEqual(
      originalObject,
    );
  });

  it('should keep undefined assignments', () => {
    const originalObject = {
      levelOne: {
        someProp: undefined,
        anotherProp: undefined,
        levelThree: {
          yo: 'sup?',
        },
      },
    };

    const updatedObject = {
      levelOne: {
        someProp: undefined,
        anotherProp: undefined,
        levelThree: {
          yo: 'nuthin',
        },
      },
    };

    expect(
      updateNestedObject(
        'levelOne.levelThree.yo',
        'nuthin',
        clone(originalObject),
      ),
    ).toEqual(updatedObject);
    // make sure original obj wasn't changed
    expect(originalObject).not.toEqual(updatedObject);
  });
});
