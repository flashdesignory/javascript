/*
 * @title: Reverse String
 * @description: Simple function to reverse string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reverseStringOne(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

function reverseStringTwo(str) {
  const middle = Math.floor(str.length / 2);
  const chars = str.split('');

  for (let i = 0; i < middle; i++) {
    const temp = chars[i];
    chars[i] = chars[chars.length - 1 - i];
    chars[chars.length - 1 - i] = temp;
  }

  return chars.join('');
}

function reverseStringThree(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }

  return chars.join('');
}

function reverseStringFour(str) {
  if (str === '') {
    return '';
  }
  return reverseStringFour(str.substr(1)) + str.charAt(0);
  // return str.charAt(str.length - 1) + reverseStringFour(str.substr(0, str.length - 1));
}

function reverseStringFive(str) {
  if (str.length <= 1) {
    return str;
  }

  const left = str[0];
  const right = str[str.length - 1];
  return right + reverseStringFive(str.substring(1, str.length - 1)) + left;
}

// npx jest algorithms/string/string.reverse.js
test('test reverse string', () => {
  expect(reverseStringOne('hello')).toEqual('olleh');
  expect(reverseStringTwo('hello')).toEqual('olleh');
  expect(reverseStringThree('hello')).toEqual('olleh');
  expect(reverseStringFour('hello')).toEqual('olleh');
  expect(reverseStringFive('hello')).toEqual('olleh');
});
