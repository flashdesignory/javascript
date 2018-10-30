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

console.log(reverseStringOne('hello'));

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

console.log(reverseStringTwo('hello'));

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

console.log(reverseStringThree('hello'));

function reverseStringFour(str) {
  if (str === '') {
    return '';
  }
  return reverseStringFour(str.substr(1)) + str.charAt(0);
}

console.log(reverseStringFour('hello'));

function reverseStringFive(str) {
  if (str.length <= 1) {
    return str;
  }

  const left = str[0];
  const right = str[str.length - 1];
  return right + reverseStringFive(str.substring(1, str.length - 1)) + left;
}

console.log(reverseStringFive('hello'));
