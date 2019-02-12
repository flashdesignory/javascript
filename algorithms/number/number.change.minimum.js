/*
 * @title: Minimum Change
 * @description: Greedy Algorithm for minimum change
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function minCoinChange(coins, amount) {
  const result = [];
  for (let i = coins.length - 1; i >= 0; i--) {
    while (amount >= coins[i]) {
      amount -= coins[i];
      result.push(coins[i]);
    }
  }
  return result;
}

minCoinChange([1, 2, 5, 10, 25], 30);

// npx jest algorithms/number/number.change.minimum.js
test('minCoinChange()', () => {
  expect(minCoinChange([1, 2, 5, 10, 25], 30)).toEqual([25, 5]);
});
