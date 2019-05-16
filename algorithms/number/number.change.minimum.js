/*
 * @title: Minimum Change
 * @description: Greedy Algorithm for minimum change
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// recursion
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

// tabulation
function minCoinChange2(coins, amount) {
  const result = [];
  for (let i = 1; i <= amount; i++) {
    result[i] = Infinity;
  }

  result[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        result[i] = Math.min(result[i], result[i - coins[j]] + 1);
      }
    }
  }
  return result[amount] > amount ? -1 : result[amount];
}

// npx jest algorithms/number/number.change.minimum.js
test('minCoinChange()', () => {
  expect(minCoinChange([1, 2, 5, 10, 25], 30)).toEqual([25, 5]);
  expect(minCoinChange2([1, 2, 5, 10, 25], 30)).toEqual(2);
});
