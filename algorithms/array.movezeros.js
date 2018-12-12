function moveZeros(arr) {
  let lastNonZeroFoundAt = 0;

  // Traverse the array. If element encountered is non-
  // zero, then replace the element at index 'count'
  // with this element
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) arr[lastNonZeroFoundAt++] = arr[i];
  }

  // Now all non-zero elements have been shifted to
  // front and  'count' is set as index of first 0.
  // Make all elements 0 from count to end.
  while (lastNonZeroFoundAt < arr.length) {
    arr[lastNonZeroFoundAt++] = 0;
  }

  return arr;
}

function moveZeros2(arr) {
  let lastNonZeroFoundAt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      const temp = arr[lastNonZeroFoundAt];
      arr[lastNonZeroFoundAt] = arr[i];
      arr[i] = temp;
      lastNonZeroFoundAt++;
    }
  }
  return arr;
}

// npx jest algorithms/array.movezeros.js
describe('move all zeros to the end', () => {
  it('moveZeros()', () => {
    const nums = [1, 2, 0, 3, 0, 1, 2];
    expect(moveZeros(nums)).toEqual([1, 2, 3, 1, 2, 0, 0]);
  });
  it('moveZeros2()', () => {
    const nums = [1, 2, 0, 3, 0, 1, 2];
    expect(moveZeros2(nums)).toEqual([1, 2, 3, 1, 2, 0, 0]);
  });
});
