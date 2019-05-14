/*
 * @title: Hamming Distance - Number of 1 Bits
 * @description: The Hamming distance between two integers
 * is the number of positions at which the corresponding bits are different.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function hammingDistance1(x, y) {
  return (x ^ y).toString(2).replace(/0/g, '').length; //eslint-disable-line
}

function hammingDistance2(x, y) {
  let count = 0;
  let z = x ^ y; // eslint-disable-line


  while (z) {
    if (z & 1) { // eslint-disable-line
      count++;
    }

    z = z >> 1; //eslint-disable-line
  }

  return count;
}

function hammingDistance3(x, y) {
  x = x.toString(2);
  y = y.toString(2);
  let difference = 0;

  while (x.length < 8 || x.length < y.length) {
    x = '0' + x; // eslint-disable-line
  }

  while (y.length < 8 || y.length < x.length) {
    y = '0' + y; // eslint-disable-line
  }

  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      difference++;
    }
  }

  return difference;
}

// npx jest algorithms/number/number.binary.distance.js
test('hamming weight: ', () => {
  expect(hammingDistance1(1, 4)).toEqual(2);
  expect(hammingDistance2(1, 4)).toEqual(2);
  expect(hammingDistance3(1, 4)).toEqual(2);
});
