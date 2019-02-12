/*
 * @title: Tower of Hanoi
 * @description: Calculate Tower of Hanoi
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function towerOfHanoi(height, from, to, buffer, result) {
  result = result || [];
  if (height >= 1) {
    towerOfHanoi(height - 1, from, buffer, to, result);
    result.push(`move disk from tower: ${from}, to tower: ${to}`);
    towerOfHanoi(height - 1, buffer, to, from, result);
  }
  return result;
}

// npx jest algorithms/number.tower.js
test('towerOfHanoi()', () => {
  expect(towerOfHanoi(3, 'a', 'b', 'c')).toEqual(
    ['move disk from tower: a, to tower: b',
      'move disk from tower: a, to tower: c',
      'move disk from tower: b, to tower: c',
      'move disk from tower: a, to tower: b',
      'move disk from tower: c, to tower: a',
      'move disk from tower: c, to tower: b',
      'move disk from tower: a, to tower: b'],
  );
});
