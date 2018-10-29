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

const b = new window.Base('foo');
b.init();
console.log(b.getId());
b.setId('baba');
console.log(b.getId());
console.log('--------------------');

const c = new window.ExtendedBase('baba');
c.init();
console.log(c.getId());
c.setName('bo');
console.log(c.getName());
console.log('--------------------');
