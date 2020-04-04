/*
 * @title: Crossbrowser Class Utils
 * @description: collection of class functions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

var Classes = (function(){// eslint-disable-line
  return {
    addClass: function (element, value) {
      if (element) {
        if (element.classList) {
          const classes = element.classList;
          if (!classes.contains(value)) {
            classes.add(value);
          }
        }
      }
    },
    removeClass: function (element, value) {
      if (element) {
        if (element.classList) {
          const classes = element.classList;
          classes.remove(value);
        }
      }
    },
    hasClass: function (element, value) {
      let temp = false;
      if (element) {
        if (element.classList) {
          const classes = element.classList;
          if (classes.contains(value)) {
            temp = true;
          }
        }
      }
      return temp;
    },
  };
})();

test('utils.classes', () => {
  const node = document.createElement('div');
  Classes.addClass(node, 'foo');
  expect(node.getAttribute('class')).toMatch(/foo/);
  Classes.addClass(node, 'bar');
  expect(node.getAttribute('class')).toMatch(/bar/);
  Classes.removeClass(node, 'foo');
  expect(Classes.hasClass(node, 'foo')).toBeFalsy();
  expect(Classes.hasClass(node, 'bar')).toBeTruthy();
});
