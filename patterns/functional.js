/*
 * @title: Functional Pattern
 * @description: Generic Functional Inheritance
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

 function base(id){
  var _id = id;

  return {
    getId:function(){
      return _id;
    },
      init:function(){
      console.log("init()");
    }
  }
 }

 function extendedBase(id){
    var _base = base(id);
    var _name;

    _base.setName = function(value){
      _name = value;
    }
    _base.getName = function(){
      return _name;
    }
    return _base;
 }

var b = base("foo");
b.init();
console.log(b.getId());
console.log("--------------------");

var c = extendedBase("baba");
c.init();
console.log(c.getId());
c.setName("bo");
console.log(c.getName());
console.log("--------------------");
