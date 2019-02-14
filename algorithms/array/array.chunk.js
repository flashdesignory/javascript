/*
 * @title: chunking array
 * @description: chunk array into given sizes
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function chunk1(arr, size) {
  const result = [];
  let index = 0;

  while (index < arr.length) {
    result.push(arr.slice(index, index + size));
    index += size;
  }

  return result;
}

function chunk2(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const last = result[result.length - 1];
    if (!last || last.length === size) {
      result.push([arr[i]]);
    } else {
      last.push(arr[i]);
    }
  }

  return result;
}

function chunk3(arr, size) {
  const numSlots = Math.ceil(arr.length / size);
  const result = [];
  for (let i = 0; i < numSlots; i++) {
    result[i] = [];
  }

  let slotIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    if (i % size === 0) slotIndex++;
    result[slotIndex].push(arr[i]);
  }
  return result;
}

// npx jest algorithms/array/array.chunk.js
describe('tests for creating chunked array', () => {
  test('chunk1()', () => {
    expect(chunk1([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });
  test('chunk2()', () => {
    expect(chunk2([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  test('chunk3()', () => {
    expect(chunk3([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });
});
