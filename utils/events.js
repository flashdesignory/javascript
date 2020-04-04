/*
 * @title: Events
 * @description: events functions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

var Events = (function(){ // eslint-disable-line
  return {
    addListener: function (_obj, _type, _function, _capture) {
      if (document.addEventListener) {
        _obj.addEventListener(_type, _function, _capture);
      } else if (document.attachEvent) {
        _obj.attachEvent(`on${_type}`, _function);
      } else {
        _obj[`on${_type}`] = _function;
      }
    },
    removeListener: function (_obj, _type, _function) {
      if (document.removeEventListener) {
        _obj.removeEventListener(_type, _function);
      } else if (document.detachEvent) {
        _obj.detachEvent(`on${_type}`, _function);
      }
    },
    getEventTarget: function (_event) {
      if (window.event != null) return window.event.srcElement;
      return _event.currentTarget;
    },
    preventDefault: function (_event) {
      if (window.event != null) window.event.returnValue = false;
      else _event.preventDefault();
    },
    dispatchEvent: function (_obj, _type) {
      let event = null;
      if (document.dispatchEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(_type, true, true);
        _obj.dispatchEvent(event);
      } else {
        event = document.createEventObject();
        _obj.fireEvent(`on${_type}`, event);
      }
    },
    dispatchCustomEvent: function (_obj, _type, _data) {
      _obj.dispatchEvent(new CustomEvent(_type, { detail: _data }));
    },
  };
})();

test.skip('skip', () => {});
