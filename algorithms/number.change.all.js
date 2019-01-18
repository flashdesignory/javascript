/*
 * @title: Coin Change
 * @description: number of coin changes
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function coinChange(coins, amount) {
  const result = [];
  for (let i = 0; i <= amount; i++) {
    result[i] = 0;
  }

  result[0] = 1;

  /* for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    for (let current = coin; current <= amount; current++) {
      const remainder = current - coin;
      result[current] += result[remainder];
    }
  } */

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      result[j] += result[j - coins[i]];
    }
  }

  return result[amount];
}

// npx jest algorithms/number.change.all.js
test('coinChange()', () => {
  const denominations = [1, 5, 10, 25];
  expect(coinChange(denominations, 1)).toEqual(1);
  expect(coinChange(denominations, 2)).toEqual(1);
  expect(coinChange(denominations, 5)).toEqual(2);
  expect(coinChange(denominations, 10)).toEqual(4);
  expect(coinChange(denominations, 25)).toEqual(13);
  expect(coinChange(denominations, 45)).toEqual(39);
  expect(coinChange(denominations, 100)).toEqual(242);
});
