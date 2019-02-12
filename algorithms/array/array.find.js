/*
 * @title: Find Item in Array
 * @description: Simple function to find an item in array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */
function countItems(arr, item) {
  let count = 0;
  const result = [];

  function flattenArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      Array.isArray(arr[i]) ? flattenArray(arr[i]) : result.push(arr[i]);
    }
  }

  flattenArray(arr);

  for (let i = 0; i < result.length; i++) {
    if (result[i].indexOf(item) !== -1) {
      count++;
    }
  }

  return count;
}

// npx jest algorithms/array.find.js
test('count items in array', () => {
  const arr = [
    'apple',
    ['banana', 'strawberry', 'apple'],
  ];

  expect(countItems(arr, 'apple')).toEqual(2);
});
