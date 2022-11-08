/*
 * @title: Singleton Pattern
 * @description: Simple example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

class Singleton {
  constructor() {
    if (this.instance) {
      throw new Error('You can only create one instance!');
    }

    this._id = Math.random() * 1000;
  }

  get id() {
    return this._id;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

const FunctionalSingleton = (function () {
  let instance;

  function init() {
    const id = Math.random() * 1000;

    return {
      getId: function () {
        return id;
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

// npx jest patterns/singleton.js
describe('patterns/singleton', () => {
  it('should only use one instance for Singleton Class', () => {
    const foo = Singleton.getInstance();
    const bar = Singleton.getInstance();
    expect(foo.id).toEqual(bar.id);
  });

  it('should only use one instance for FunctionalSingleton', () => {
    const foo = FunctionalSingleton.getInstance();
    const bar = FunctionalSingleton.getInstance();
    expect(foo.getId()).toEqual(bar.getId());
  });
});
