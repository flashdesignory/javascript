/*
 * @title: Module Pattern
 * @description: Generic Module Example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const Module = (function () {
  let _privateVar = 'foo';

  function privateFunction() {
    return 'privateFunction()';
  }

  return {
    setPrivateVar: function (value) {
      _privateVar = value;
    },
    getPrivateVar: function () {
      return _privateVar;
    },
    publicFunction: function () {
      return 'publicFunction()';
    },
    callPrivateFunction: function () {
      privateFunction();
    },
  };
})();

const ModuleTwo = (function () {
  let _privateVar = 'foo';
  let publicInterface;

  function privateFunction() {
    console.log('privateFunction()');
    console.log(publicInterface.getPrivateVar());
  }

  publicInterface = {
    setPrivateVar: function (value) {
      _privateVar = value;
    },
    getPrivateVar: function () {
      return _privateVar;
    },
    publicFunction: function () {
      console.log('publicFunction()');
      privateFunction();
    },
  };

  return publicInterface;
})();

test('pattners.module', () => {
  expect(Module.publicFunction()).toEqual('publicFunction()');
  expect(Module.getPrivateVar()).toEqual('foo');
  expect(Module._privateVar).toBeUndefined();
});

test('pattners.module2', () => {
  console.log = jest.fn();
  ModuleTwo.publicFunction();
  expect(console.log).toHaveBeenCalledTimes(3);
});
