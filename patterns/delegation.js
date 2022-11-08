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

// npx jest patterns/delegation.js
describe('patterns/delegation', () => {
  it('should extend another object', () => {
    const b = Object.create(Base);
    b.init('foo');
    expect(b.getId()).toEqual('foo');

    const c = Object.create(ExtendedBase);
    c.init('baba');
    expect(c.getId()).toEqual('baba');
    c.setName('bo');
    expect(c.getName()).toEqual('bo');
  });
});
