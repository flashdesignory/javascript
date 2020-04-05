/*
 * @title: simple Class
 * @description: Generic Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
(function () {
  function Base(id) {
    let _id = id;

    this.getId = function () {
      return _id;
    };

    this.setId = function (value) {
      _id = value;
    };

    this.init = function () {
      console.log('init()');
    };
  }
  window.Base = Base;
})();

(function () {
  function ExtendedBase(id) {
    const _super = new window.Base(id);
    let _name;

    /* eslint-disable-next-line */
    for (let name in _super) {
      this[name] = _super[name];
    }

    this.setName = function (value) {
      _name = value;
    };

    this.getName = function () {
      return _name;
    };

    this.constructor = window.Base;
  }
  window.ExtendedBase = ExtendedBase;
})();

test('patterns.class', () => {
  const b = new window.Base('foo');
  b.init();
  b.getId();
  b.setId('baba');
  expect(b.getId()).toBe('baba');
  const c = new window.ExtendedBase('baba');
  c.init();
  c.setName('bo');
  expect(c.getName()).toBe('bo');
});
