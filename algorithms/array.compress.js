/*
 * @title: compress array
 * @description: Simple function to compress an array
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

const nums = [1, 2, 3, 10, 25, 26, 30, 31, 32, 33];

function compressArray(arr) {
  let start = arr[0];
  let end = start;
  let result = '';

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      if (start === end) {
        result += `${start},`;
      } else {
        result += `${start}-${end},`;
      }
      start = arr[i];
      end = start;
    }
  }

  if (start === end) {
    result += start;
  } else {
    result += `${start}-${end}`;
  }
  return result;
}

console.log(compressArray(nums)); // 1-3,10,25-26,30-33
