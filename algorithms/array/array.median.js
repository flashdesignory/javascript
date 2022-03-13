/*
 * @title: Median two sorted arrays
 * @description: find median of two sorted arrays of different lengths
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function getMedian(nums1, nums2) {
  const totalLength = nums1.length + nums2.length;
  const middle = totalLength / 2;
  const isEven = totalLength % 2 === 0;

  let index1 = 0;
  let index2 = 0;
  let current = null;
  let previous = null;

  while (index1 + index2 <= middle) {
    if (current) {
      previous = current;
    }

    const one = nums1[index1];
    const two = nums2[index2];

    if (!one || two < one) {
      current = two;
      index2++;
    } else {
      current = one;
      index1++;
    }
  }

  return isEven ? (previous + current) / 2 : current;
}

// npx jest algorithms/array/array.median.js
describe('median', () => {
  it('should return median of two arrays', () => {
    expect(getMedian([1, 3, 5, 7, 9], [2, 4, 6, 8])).toEqual(5);
    expect(getMedian([900], [5, 8, 10, 20])).toEqual(10);
    expect(getMedian([1, 2, 3, 9, 10], [3, 4, 5, 6, 7, 8, 9])).toEqual(5.5);
  });
});
