/*
 * @title: product of array
 * @description: find product of array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function productArray(arr) {
  const result = [];
  const start = 0;
  const end = arr.length;

  for (let i = 0; i < arr.length; i++) {
    const left = arr.slice(start, i);
    const right = arr.slice(i + 1, end);
    const current = left.concat(right);
    const product = current.reduce((acc, num) => acc * num);
    result[i] = product;
  }

  return result;
}


function productArray2(arr) {
  let temp = 1;
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result[i] = temp;
    temp *= arr[i];
  }

  temp = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    result[i] *= temp;
    temp *= arr[i];
  }

  return result;
}

productArray2([10, 3, 5, 6, 2]);

// npx jest algorithms/array/array.product.js
test('productArray()', () => {
  expect(productArray([10, 3, 5, 6, 2])).toEqual([180, 600, 360, 300, 900]);
  expect(productArray2([10, 3, 5, 6, 2])).toEqual([180, 600, 360, 300, 900]);
});
