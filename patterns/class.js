/*
 * @title: simple Class
 * @description: Generic Class
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
(function(){
	function Base(id){
		var _id = id;

		this.getId = function(){
			return _id;
		}

		this.setId = function(value){
			_id = value;
		}

		this.init = function(){
			console.log("init()");
		}

	}
	window.Base = Base;
})();

(function(){
	function ExtendedBase(id){
		var _super = new window.Base(id);

		var _name;

		for(var name in _super){
			this[name] = _super[name];
		}

		this.setName = function(value){
			_name = value;
		}

		this.getName = function(){
			return _name;
		}

		this.constructor = window.Base;
	}
	window.ExtendedBase = ExtendedBase;
})();

var b = new window.Base("foo");
b.init();
console.log(b.getId());
b.setId("baba");
console.log(b.getId());
console.log("--------------------");

var c = new window.ExtendedBase("baba");
c.init();
console.log(c.getId());
c.setName("bo");
console.log(c.getName());
console.log("--------------------");
