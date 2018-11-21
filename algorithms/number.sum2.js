/*
 * @title: Sum
 * @description: simple sum algo
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function pairMatchingSum(arr, sum) {
  /* let seen = {};
  let result = [];

  for(let i = 0; i<arr.length; i++){
    let current = arr[i];
    let missing = sum -  current;
    if(seen[missing]){
      result[[current, missing]] = true;
    }
    seen[current] = true;
  }
  return Object.keys(result); */
  let left;
  let right;
  let current;

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  const sorted = arr.sort();
  const result = {};

  while (leftIndex < rightIndex) {
    left = sorted[leftIndex];
    right = sorted[rightIndex];
    current = left + right;

    if (current === sum) {
      result[`${left}-${right}`] = true;
      leftIndex++;
      rightIndex--;
    } else if (current > sum) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }

  return Object.keys(result);
}

// npx jest algorithms/number.sum2.js
test('pairMatchingSum()', () => {
  const unSortedArr = [2, 3, 2, 5, 4, 5, 5, 5, 5, 9, 6, 8, 8, 7];
  const sum = 10;
  expect(pairMatchingSum(unSortedArr, sum)).toEqual(['2-8', '3-7', '4-6', '5-5']);
});
