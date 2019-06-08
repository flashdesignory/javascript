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

function removeDuplicates5(nums) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) !== i) {
      count++;
    } else {
      nums[i - count] = nums[i];
    }
  }
  return nums.slice(0, nums.length - count);
}

// remove from sorted array
function removeDuplicates6(nums) {
  let count = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[count]) {
      count++;
      nums[count] = nums[i];
    }
  }
  return nums.slice(0, count + 1);
}

// npx jest algorithms/array/array.duplicates.js
describe('remove duplicates in array', () => {
  test('removeDuplicates1()', () => {
    const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
    expect(removeDuplicates1(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates2()', () => {
    const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
    expect(removeDuplicates2(nums)).toEqual([1, 2, 8, 6, 4, 5, 3]);
  });
  test('removeDuplicates3()', () => {
    const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
    expect(removeDuplicates3(nums)).toEqual([1, 3, 5, 2, 4, 8, 6]);
  });
  test('removeDuplicates4()', () => {
    const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
    expect(removeDuplicates4(nums)).toEqual([1, 3, 5, 2, 4, 8, 6]);
  });
  test('removeDuplicates5()', () => {
    const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];
    expect(removeDuplicates5(nums)).toEqual([1, 3, 5, 2, 4, 8, 6]);
  });
  test('removeDuplicates6()', () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    expect(removeDuplicates6(nums)).toEqual([0, 1, 2, 3, 4]);
  });
});
