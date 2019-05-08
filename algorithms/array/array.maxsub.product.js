/*
 * @title: Max Product Array
 * @description: Find max product of subarray
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function maxSubArrayProduct(arr) {
  if (arr === null || arr.length === 0) return 0;

  let min = arr[0];
  let max = arr[0];
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // When multiplied by negative number,
    // max becomes min and min becomes max
    if (arr[i] < 0) {
      const temp = max;
      max = min;
      min = temp;
    }

    max = Math.max(arr[i], max * arr[i]);
    min = Math.min(arr[i], min * arr[i]);

    result = Math.max(result, max);
  }

  return result;
}

function maxSubArrayProduct2(arr) {
  if (arr === null || arr.length === 0) return 0;

  let max = arr[0];
  let min = max;
  let result = max;

  for (let i = 1; i < arr.length; i++) {
    const tMax = arr[i] * max;
    const tMin = arr[i] * min;

    max = Math.max(Math.max(tMax, arr[i]), tMin);
    min = Math.min(Math.min(tMax, arr[i]), tMin);
    result = Math.max(result, max);
  }

  return result;
}

function maxSubArrayProduct3(arr) {
  let result = -Number.MAX_VALUE;
  let min = 1;
  let max = 1;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    [min, max] = [
      Math.min(num, min * num, max * num),
      Math.max(num, min * num, max * num),
    ];
    result = Math.max(result, max);
  }
  return result;
}

// npx jest algorithms/array/array.maxsub.product.js
test('maxSubArrayProduct()', () => {
  expect(maxSubArrayProduct([2, 3, -2, 4])).toEqual(6);
  expect(maxSubArrayProduct([1, -2, -3, 0, 7, -8, -2])).toEqual(112);
  expect(maxSubArrayProduct([-2, 0, -1])).toEqual(0);
});

test('maxSubArrayProduct2()', () => {
  expect(maxSubArrayProduct2([2, 3, -2, 4])).toEqual(6);
  expect(maxSubArrayProduct2([1, -2, -3, 0, 7, -8, -2])).toEqual(112);
  expect(maxSubArrayProduct2([-2, 0, -1])).toEqual(0);
});

test('maxSubArrayProduct()3', () => {
  expect(maxSubArrayProduct3([2, 3, -2, 4])).toEqual(6);
  expect(maxSubArrayProduct3([1, -2, -3, 0, 7, -8, -2])).toEqual(112);
  expect(maxSubArrayProduct3([-2, 0, -1])).toEqual(0);
});
