/*
 * @title: Multiply Strings
 * @description: Given two non-negative integers num1 and num2
 * represented as strings, return the product of num1 and num2,
 * also represented as a string.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const product = new Array(num1.length + num2.length);
  product.fill(0);
  const length = num1.length + num2.length - 1;
  let position = length;

  for (let i = num1.length - 1; i >= 0; i--) {
    let temp = position;
    for (let j = num2.length - 1; j >= 0; j--) {
      product[temp] += parseInt(num1.charAt(i), 10) * parseInt(num2.charAt(j), 10);
      product[temp - 1] += Math.floor(product[temp] / 10);
      product[temp] %= 10;

      temp--;
    }

    position--;
  }

  if (product[0] === 0) {
    for (let i = 0; i <= length; i++) {
      if (product[i] === 0) {
        product.splice(i, 1);
        if (product[i] > 0) break;
      }
    }
  }

  return product.join('');
};

// npx jest algorithms/string/string.multiply.js
test('multiply()', () => {
  expect(multiply('2', '3')).toEqual('6');
  expect(multiply('9', '10')).toEqual('90');
  expect(multiply('123', '456')).toEqual('56088');
});
