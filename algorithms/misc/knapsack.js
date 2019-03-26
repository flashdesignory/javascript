/*
 * @title: Knapsack
 * @description: Knapsack implementations
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursive
// Big O(2^n) n === index
function knapsack(capacity, weights, values, index) {
  if (index === 0 || capacity === 0) return 0;

  // If weight of the nth item is more than Knapsack capacity W, then
  // this item cannot be included in the optimal solution
  if (weights[index - 1] > capacity) {
    return knapsack(capacity, weights, values, index - 1);
  }

  // Return the maximum of two cases:
  // (1) nth item included
  // (2) not included
  return Math.max(
    values[index - 1] + knapsack(capacity - weights[index - 1], weights, values, index - 1),
    knapsack(capacity, weights, values, index - 1),
  );
}

// tabulation
// Big O(nW) n === index, W === capacity
function knapsack2(capacity, weights, values, index) {
  const result = [];
  for (let i = 0; i <= values.length; i++) {
    result[i] = [];
    for (let j = 0; j <= capacity; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 1; i <= index; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (weights[i - 1] <= j) {
        result[i][j] = Math.max(
          values[i - 1] + result[i - 1][j - weights[i - 1]],
          result[i - 1][j],
        );
      } else {
        result[i][j] = result[i - 1][j];
      }
    }
  }

  return result[index][capacity];
}

// npx jest algorithms/misc/knapsack.js
describe('knapsack solutions', () => {
  const values = [60, 100, 120];
  const weights = [10, 20, 30];
  const capacity = 50;

  test('knapsack recursive', () => {
    expect(knapsack(capacity, weights, values, values.length)).toEqual(220);
  });

  test('knapsack tabulation', () => {
    expect(knapsack2(capacity, weights, values, values.length)).toEqual(220);
  });
});
