/*
 * @title: captialize first letters of string
 * @description: Simple function to capitalize
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function capitalizeFirst(arr) {
  if (arr.length === 1) {
    return [arr[0][0].toUpperCase() + arr[0].substr(1)];
  }

  const result = capitalizeFirst(arr.slice(0, -1));
  const string = arr.slice(-1)[0][0].toUpperCase() + arr.slice(-1)[0].substr(1);
  result.push(string);
  return result;
}

function capitalizeFirst2(str) {
  const result = [];
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    result.push(word[0].toUpperCase() + word.slice(1));
  }
  return result.join(' ');
}

function capitalizeFirst3(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!str[i - 1] || str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }
  return result;
}

// npx jest algorithms/string/string.capitalize.js
test('capitalizeFirst()', () => {
  expect(capitalizeFirst(['car', 'taco', 'banana'])).toEqual(['Car', 'Taco', 'Banana']);
});
test('capitalizeFirst2()', () => {
  expect(capitalizeFirst2('look, it is working!')).toEqual('Look, It Is Working!');
});
test('capitalizeFirst3()', () => {
  expect(capitalizeFirst3('look, it is working!')).toEqual('Look, It Is Working!');
});
