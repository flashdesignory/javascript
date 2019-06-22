/*
 * @title: String Add
 * @description: add two strings and return sum
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
const addStrings = function (num1, num2) {
  let index1 = num1.length - 1;
  let index2 = num2.length - 1;
  let carry = 0;
  let sum = '';

  while (index1 >= 0 || index2 >= 0 || carry) {
    const digit1 = index1 < 0 ? 0 : +num1.charAt(index1);
    const digit2 = index2 < 0 ? 0 : +num2.charAt(index2);
    const total = digit1 + digit2 + carry;
    const digit = (total % 10).toString();

    sum = digit + sum;
    carry = Math.floor(total / 10);
    index1--;
    index2--;
  }

  return sum;
};

// npx jest algorithms/string/string.add.js
test('addStrings()', () => {
  expect(addStrings('125', '1456')).toEqual('1581');
});
