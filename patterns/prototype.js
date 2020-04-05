/*
 * @title: simple Prototype
 * @description: Generic Prototype
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function Base(id) {
  this.id = id;
}

Base.prototype.getId = function () {
  return this.id;
};

Base.prototype.setId = function (value) {
  this.id = value;
};

Base.prototype.init = function () {
  console.log('init()');
};

function ExtendedBase(id) {
  this.id = id;
}

ExtendedBase.prototype = Object.create(Base.prototype);
ExtendedBase.prototype.constructor = ExtendedBase;

ExtendedBase.prototype.setName = function (value) {
  this.name = value;
};

ExtendedBase.prototype.getName = function () {
  return this.name;
};

test.skip('patterns.prototype', () => {
  const b = new Base('foo');
  b.init();
  expect(b.getId()).toEqual('foo');

  const c = new ExtendedBase('baba');
  c.init();
  expect(c.getId()).toEqual('baba');
  c.setName('bo');
  expect(c.getName()).toEqual('bo');
});
