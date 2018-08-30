/*
 * @title: Reverse String
 * @description: Simple function to reverse string
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function reverseString_one(str) {
  var result = "";
  for (var i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseString_one("hello"));

function reverseString_two(str) {
  var middle = Math.floor(str.length / 2);
  var chars = str.split("");

  for (var i = 0; i < middle; i++) {
    var temp = chars[i];
    chars[i] = chars[chars.length - 1 - i];
    chars[chars.length - 1 - i] = temp;
  }

  return chars.join("");
}

console.log(reverseString_two("hello"));

function reverseString_three(str) {
  var chars = str.split("");
  var left = 0;
  var right = chars.length - 1;

  while (left < right) {
    var temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }

  return chars.join("");
}

console.log(reverseString_three("hello"));

function reverseString_four(str) {
  if (str === "") {
    return "";
  } else {
    return reverseString_four(str.substr(1)) + str.charAt(0);
  }
}

console.log(reverseString_four("hello"));

function reverseString_five(str) {
  if (str.length <= 1) {
    return str;
  }

  var left = str[0];
  var right = str[str.length - 1];
  return right + reverseString_five(str.substring(1, str.length - 1)) + left;
}

console.log(reverseString_five("hello"));
