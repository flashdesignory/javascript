/*
 * @title: Behavioral Delegation Pattern
 * @description: Generic Behavioral Delegation Pattern
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

const Base = {
  init: function (id) {
    this.id = id;
  },
  getId: function () {
    return this.id;
  },
};

const ExtendedBase = Object.create(Base);
ExtendedBase.setName = function (name) {
  this.name = name;
};
ExtendedBase.getName = function () {
  return this.name;
};

const b = Object.create(Base);
b.init('foo');
console.log(b.getId());
console.log('--------------------');

const c = Object.create(ExtendedBase);
c.init('baba');
console.log(c.getId());
c.setName('bo');
console.log(c.getName());
console.log('--------------------');

test.skip('skip', () => {});
