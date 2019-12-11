/*
 * @title: Reverse Array
 * @description: Simple function to reverse array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// while loop - left / right pointers
// time complexity O(n)
// space complexity O(1)
function reverse1(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }

  return arr;
}

// for loop
// time complexity O(n)
// space complexity O(1)
function reverse2(arr) {
  const len = arr.length;
  const middle = Math.floor(len / 2);

  for (let i = 0; i < middle; i++) {
    const temp = arr[i];
    arr[i] = arr[len - 1 - i];
    arr[len - 1 - i] = temp;
  }

  return arr;
}

// array destructuring
// time complexity O(n)
// space complexity O(1)
function reverse3(arr) {
  const len = arr.length;
  const middle = Math.floor(len / 2);

  for (let i = 0; i < middle; i++) {
    [arr[i], arr[len - 1 - i]] = [arr[len - 1 - i], arr[i]];
  }

  return arr;
}

// for loop backwards - extra array
// time complexity O(n)
// space complexity O(n)
function reverse4(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

// for loop forward - extra array
// time complexity O(n)
// space complexity O(n)
function reverse5(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[arr.length - 1 - i]);
  }
  return result;
}

// npx jest algorithms/array/array.reverse.js
describe('reverse array', () => {
  test('reverse1()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverse1(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
  test('reverse2()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverse2(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
  test('reverse3()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverse3(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
  test('reverse4()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverse4(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
  test('reverse5()', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(reverse5(nums)).toEqual([7, 6, 5, 4, 3, 2, 1]);
  });
});
