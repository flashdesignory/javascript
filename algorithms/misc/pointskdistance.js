/*
 * @title: K Closest Points to Origin
 * @description: We have a list of points on the plane.
 * Find the K closest points to the origin (0, 0).
 * The distance between two points on a plane is the Euclidean distance.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function getDistance(point) {
  return point[0] * point[0] + point[1] * point[1];
}

function kClosest1(points, k) {
  const distances = [];
  for (let i = 0; i < points.length; i++) {
    distances.push(getDistance(points[i]));
  }

  distances.sort((a, b) => a - b);
  const maxDistance = distances[k - 1];
  const result = [];

  for (let i = 0; i < points.length; i++) {
    if (getDistance(points[i]) <= maxDistance) {
      result.push(points[i]);
    }
  }

  return result;
}

// Quick Select
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(points, low, high) {
  const pivot = points[high];
  let i = low;
  let j = low;

  while (i < high) {
    if (getDistance(points[i]) < getDistance(pivot)) {
      swap(points, i, j);
      j++;
    }
    i++;
  }

  swap(points, high, j);
  return j;
}

function quickSelect(points, k, low, high) {
  if (low >= high) return;

  const index = partition(points, low, high);
  if (index === k - 1) return;

  if (index < k - 1) quickSelect(points, k, index + 1, high);
  else quickSelect(points, k, low, index + 1);
}

function kClosest2(points, k) {
  quickSelect(points, k, 0, points.length - 1);
  return points.slice(0, k);
}

// npx jest algorithms/misc/pointskdistance.js
test('kClosest1()', () => {
  expect(kClosest1([[3, 3], [5, -1], [-2, 4]], 2)).toEqual([[3, 3], [-2, 4]]);
});
test('kClosest2()', () => {
  expect(kClosest2([[3, 3], [5, -1], [-2, 4]], 2)).toEqual([[3, 3], [-2, 4]]);
});
