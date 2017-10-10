/*
 * @title: Module Pattern
 * @description: Generic Module Example
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

var Module = (function(){
	var _privateVar = "foo";

	function privateFunction(){
		console.log("privateFunction()");
	}

	return {
		setPrivateVar:function(value){
			_privateVar = value;
		},
		getPrivateVar:function(){
			return _privateVar;
		},
		publicFunction:function(){
			console.log("publicFunction()");
		}
	}
})();

//example
Module.publicFunction();
console.log(Module.getPrivateVar());
console.log(Module._privateVar); //undefined

var ModuleTwo = (function(){
	var _privateVar = "foo";

	function privateFunction(){
		console.log("privateFunction()");
		console.log(publicInterface.getPrivateVar());
	}

	var publicInterface = {
		setPrivateVar:function(value){
			_privateVar = value;
		},
		getPrivateVar:function(){
			return _privateVar;
		},
		publicFunction:function(){
			console.log("publicFunction()");
			privateFunction();
		}
	};

	return publicInterface;
})();

//example
ModuleTwo.publicFunction();
console.log(ModuleTwo._privateVar); //undefined