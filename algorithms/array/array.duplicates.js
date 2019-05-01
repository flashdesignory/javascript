/*
 * @title: Remove Duplicates from Array
 * @description: Simple function to remove dupes from array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
 * input: [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
 * output: [ 1, 2, 8, 6, 4, 5, 3 ]
 */

function removeDuplicates1(arr) {
  let counter = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[counter]) {
      counter++;
      const temp = arr[counter];
      arr[counter] = arr[i];
      arr[i] = temp;
    }
  }
  return arr.slice(0, counter + 1);
}

function removeDuplicates(arr) {
  let i = arr.length - 1;
  const seen = {};
  while (i >= 0) {
    if (!seen[arr[i]]) {
      seen[arr[i]] = true;
    } else {
      arr.splice(i, 1);
    }
    i--;
  }
  return arr;
}

function removeDuplicates2(arr) {
  function remove(arr, index, seen) {
    if (index < 0) return arr;
    seen = seen || {};
    if (seen[arr[index]]) {
      arr.splice(index, 1);
    } else {
      seen[arr[index]] = true;
    }
    return remove(arr, index - 1, seen);
  }
  return remove(arr, arr.length - 1);
}

function removeDuplicates3(arr) {
  return arr.filter((elem, index) => index === arr.indexOf(elem));
}

function removeDuplicates4(arr) {
  return [...new Set(arr)];
}

// npx jest algorithms/array/array.duplicates.js
describe('remove duplicates in array', () => {
  const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];

  test('removeDuplicates()', () => {
    expect(removeDuplicates(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates1()', () => {
    expect(removeDuplicates1(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates2()', () => {
    expect(removeDuplicates2(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates3()', () => {
    expect(removeDuplicates3(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates4()', () => {
    expect(removeDuplicates4(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
});
