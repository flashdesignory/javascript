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

// npx jest algorithms/string.capitalize.js
test('capitalizeFirst()', () => {
  expect(capitalizeFirst(['car', 'taco', 'banana'])).toEqual(['Car', 'Taco', 'Banana']);
});
