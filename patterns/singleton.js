/*
 * @title: Singleton Pattern
 * @description: Simple example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const singleton = (function () {
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

const foo = singleton.getInstance();
console.log(foo.getId());
const bar = singleton.getInstance();
console.log(bar.getId());

test.skip('skip', () => {});
