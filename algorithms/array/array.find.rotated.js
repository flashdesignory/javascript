/*
 * @title: Find Item in Array
 * @description :find value in sorted rotated array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findInRotatedArray(arr, value) {
  if (arr === null || arr.length === 0) {
    return -1;
  }
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    const current = arr[middle];
    if (current === value) return middle;

    // left side is sorted
    if (arr[start] <= current) {
      if (arr[start] <= value && value < current) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
      // right side sorted
    } else if (current < value && value <= arr[end]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return -1;
}

function findInRotatedArray2(arr, value) {
  if (arr === null || arr.length === 0) {
    return -1;
  }
  let start = 0;
  let end = arr.length - 1;
  let index = -1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    const current = arr[middle];
    if (current === value) {
      index = middle;
      break;
    } else if ((arr[start] <= value && value < current)
      || (arr[start] > arr[middle]
       && (arr[start] <= value || value < arr[middle]))) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return index;
}
// npx jest algorithms/array/array.find.rotated.js
test('findInRotatedArray()', () => {
  expect(findInRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4);
  expect(findInRotatedArray([3, 1], 1)).toEqual(1);
});

test('findInRotatedArray2()', () => {
  expect(findInRotatedArray2([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4);
  expect(findInRotatedArray2([3, 1], 1)).toEqual(1);
});
