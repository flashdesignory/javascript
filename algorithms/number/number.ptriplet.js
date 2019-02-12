/*
 * @title: Pythagorean Triplet in an array
 * @description: check array if triplet exists
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isTriplet(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        const x = arr[i] * arr[i];
        const y = arr[j] * arr[j];
        const z = arr[k] * arr[k];

        if (x === y + z || y === x + z || z === x + y) {
          // console.log(arr[i], arr[j], arr[k]);
          return true;
        }
      }
    }
  }
  return false;
}

function isTriplet2(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * arr[i]; //eslint-disable-line
  }
  arr.sort((a, b) => a - b);
  // console.log(arr);

  for (let i = arr.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;

    while (left < right) {
      if (arr[left] + arr[right] === arr[i]) {
        // console.log(Math.sqrt(arr[i]), Math.sqrt(arr[left]), Math.sqrt(arr[right]));
        return true;
      }
      (arr[left] + arr[right] < arr[i]) ? left++ : right--;
    }
  }
  return false;
}

// npx jest algorithms/number/number.ptriplet.js
test('isTriplet()', () => {
  expect(isTriplet([3, 1, 4, 6, 5])).toBe(true);
  expect(isTriplet([10, 4, 6, 12, 5])).toBe(false);
});

test('isTriplet2()', () => {
  expect(isTriplet2([3, 1, 4, 6, 5])).toBe(true);
  expect(isTriplet2([10, 4, 6, 12, 5])).toBe(false);
});

/* function pythagoreanTriplet(n){
  for(var a = 1; a < n - 1; a++){
    for(var b = a; b < n; b++){
      c = Math.sqrt(a * a + b * b);
      if(c % 1 === 0){
        console.log(a, b, c);
      }
    }
  }
}
pythagoreanTriplet(12) */
