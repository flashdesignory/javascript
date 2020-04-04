/*
 * @title: Functional Pattern
 * @description: Generic Functional Inheritance
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function base(id) {
  const _id = id;

  return {
    getId: function () {
      return _id;
    },
    init: function () {
      console.log('init()');
    },
  };
}

function extendedBase(id) {
  const _base = base(id);
  let _name;

  _base.setName = function (value) {
    _name = value;
  };

  _base.getName = function () {
    return _name;
  };

  return _base;
}

const b = base('foo');
b.init();
console.log(b.getId());
console.log('--------------------');

const c = extendedBase('baba');
c.init();
console.log(c.getId());
c.setName('bo');
console.log(c.getName());
console.log('--------------------');

test.skip('skip', () => {});
