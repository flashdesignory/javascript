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

test.skip('patterns.functional', () => {
  const b = base('foo');
  b.init();
  expect(b.getId()).toEqual('foo');

  const c = extendedBase('baba');
  c.init();
  expect(c.getId()).toEqual('baba');
  c.setName('bo');
  expect(c.getName()).toEqual('bo');
});
