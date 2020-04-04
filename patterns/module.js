/*
 * @title: Module Pattern
 * @description: Generic Module Example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const Module = (function () {
  let _privateVar = 'foo';

  function privateFunction() {
    console.log('privateFunction()');
  }

  return {
    setPrivateVar: function (value) {
      _privateVar = value;
    },
    getPrivateVar: function () {
      return _privateVar;
    },
    publicFunction: function () {
      console.log('publicFunction()');
    },
    callPrivateFunction: function () {
      privateFunction();
    },
  };
})();

// example
Module.publicFunction();
console.log(Module.getPrivateVar());
console.log(Module._privateVar); // undefined

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

// example
ModuleTwo.publicFunction();
console.log(ModuleTwo._privateVar); // undefined

test.skip('skip', () => {});
