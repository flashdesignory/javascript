/*
 * @title: Debug
 * @description: simple debug tool
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
 
var Debug = (function(window) {

  var _debug = true;

	return{
		getDebug: function(){
			return _debug;
		},
		setDebug: function(value){
			_debug = value;
		},
		log: function(channel, message){
			if(!_debug) return;

			if(window.console) {
				try {
					console.log(channel + ": " + message);
				} catch(e) {
					
				}
			}
		}
	};

})(window);
