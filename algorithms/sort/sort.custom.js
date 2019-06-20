/*
 * @title: custom sort functions
 * @description: comparators to pass into sort function
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function comparator(a, b) {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return a.name.localeCompare(b.name);
}

// npx jest algorithms/sort/sort.custom.js
test('sort players by name and score', () => {
  const input = [{ name: 'Smith', score: 20 }, { name: 'Jones', score: 15 }, { name: 'Jones', score: 20 }];
  const output = [{ name: 'Jones', score: 20 }, { name: 'Smith', score: 20 }, { name: 'Jones', score: 15 }];
  expect(input.sort(comparator)).toEqual(output);
});
