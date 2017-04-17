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
		log: function(channel, message, css){
			if(!_debug) return;

			if(window.console) {
				try {
					if(css){
						console.log("%c" + channel + ": " + message, css);
					}else{
						console.log(channel + ": " + message);
					}
				} catch(e) {
					//do something smart here..
				}
			}
		}
	};

})(window);