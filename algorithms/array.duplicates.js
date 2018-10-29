/*
 * @title: Remove Duplicates from Array
 * @description: Simple function to remove dupes from array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const nums = [1, 3, 5, 2, 3, 4, 8, 6, 4, 5, 5, 3];

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

removeDuplicates(nums);

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

removeDuplicates2(nums);
