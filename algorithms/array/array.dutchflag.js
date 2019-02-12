/*
 * @title: dutch flag
 * @description: sort array of 0,1,2 into 3 partitions
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  * input: [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]
  * output: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]
  */

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

// bigO(n)
function dutchFlag(arr) {
  let low = 0;
  let middle = 0;
  let high = arr.length - 1;

  while (middle <= high) {
    switch (arr[middle]) {
      case 0:
        swap(arr, low, middle);
        low++;
        middle++;
        break;
      case 1:
        middle++;
        break;
      case 2:
        swap(arr, middle, high);
        high--;
        break;
      default:
    }
  }
  return arr;
}

// npx jest algorithms/array/array.dutchflag.js
test('dutch flag sorting', () => {
  expect(dutchFlag([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]))
    .toEqual([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]);
});
