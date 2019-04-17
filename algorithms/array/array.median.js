/*
 * @title: Median two sorted arrays
 * @description: find median of two sorted arrays of different lengths
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function getMedian(arr1, arr2) {
  const length1 = arr1.length;
  const length2 = arr2.length;
  const totalLength = length1 + length2;
  const isEven = totalLength % 2 === 0;
  const middle = Math.floor(totalLength / 2);

  let index1 = 0;
  let index2 = 0;

  let current = null;

  if (isEven) {
    let previous = null;
    for (let i = 0; i <= middle; i++) {
      previous = current;
      if (arr1[index1] < arr2[index2]) {
        current = arr1[index1++];
      } else {
        current = arr2[index2++];
      }
    }

    return (previous + current) / 2;
  }

  for (let i = 0; i <= middle; i++) {
    if (arr1[index1] < arr2[index2]) {
      current = arr1[index1++];
    } else {
      current = arr2[index2++];
    }
  }

  return current;
}

// npx jest algorithms/array/array.median.js
describe('median', () => {
  it('should return median of two arrays', () => {
    expect(getMedian([1, 3, 5, 7, 9], [2, 4, 6, 8])).toEqual(5);
    expect(getMedian([900], [5, 8, 10, 20])).toEqual(10);
    expect(getMedian([1, 2, 3, 9, 10], [3, 4, 5, 6, 7, 8, 9])).toEqual(5.5);
  });
});
