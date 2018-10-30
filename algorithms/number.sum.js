/*
 * @title: Sum
 * @description: simple sum algo
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function findSum(arr, sum) {
  const found = {};
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const missing = sum - current;
    if (found[missing]) {
      return [missing, current];
    }
    found[current] = true;
  }
  return false;
}

findSum([3, 4, 1, 2, 9], 10);
