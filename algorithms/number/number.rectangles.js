/*
 * @title: Overlapping Rectangles
 * @description: check for overlapping rectangles
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// x incresing to right
// y increasing to bottom

function doOverlap(l1, r1, l2, r2) {
  // one rectangle to the left of other
  if (l1.x > r2.x || l2.x > r1.x) {
    return false;
  }

  // one rectangle above other
  if (l1.y > r2.y || l2.y > r1.y) {
    return false;
  }

  return true;
}

function doOverlap2(x1, y1, w1, h1, x2, y2, w2, h2) {
  // one rectangle to the left of other
  if ((x1 + w1) < x2 || (x2 + w2) < x1) {
    return false;
  }

  // one rectangle above other
  if ((y1 + h1) < y2 || (y2 + h2) < y1) {
    return false;
  }

  return true;
}


// npx jest algorithms/number/number.rectangles.js
test('ocerlapping rectangles()', () => {
  /* const matrix1 = [[1, 1, 1, 1, 0, 0, 0, 0],
                      [1, 1, 1, 1, 0, 0, 2, 2],
                      [0, 0, 0, 0, 0, 0, 2, 2]]; */
  expect(doOverlap({ x: 0, y: 0 }, { x: 3, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 2 })).toBe(false);
  expect(doOverlap2(0, 0, 3, 1, 6, 1, 1, 1)).toBe(false);
});

test('ocerlapping rectangles2()', () => {
  /* const matrix2 = [[1, 1, 1, 1, 0, 0, 0, 0],
                      [1, 1, 1, 3, 2, 2, 2, 2],
                      [0, 0, 0, 2, 2, 2, 2, 2]]; */
  expect(doOverlap({ x: 0, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 1 }, { x: 7, y: 2 })).toBe(true);
  expect(doOverlap2(0, 0, 3, 1, 3, 1, 4, 1)).toBe(true);
});
