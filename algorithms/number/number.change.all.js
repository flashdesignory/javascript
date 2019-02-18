/*
 * @title: Coin Change
 * @description: number of coin changes
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

// tabulation
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

// recursive
function coinChange2(coins, index, amount) {
  // If amount is 0 then there is 1 solution
  // (do not include any coin)
  if (amount === 0) return 1;

  // If amount is less than 0 then no
  // solution exists
  if (amount < 0) return 0;

  // If there are no coins and amount
  // is greater than 0, then no
  // solution exist
  if (index <= 0 && amount >= 1) return 0;

  // count is sum of solutions (i)
  // including coins[index-1] (ii) excluding coins[index-1]
  return coinChange2(coins, index - 1, amount)
    + coinChange2(coins, index, amount - coins[index - 1]);
}

// npx jest algorithms/number/number.change.all.js
test('coinChange tabulation', () => {
  const denominations = [1, 5, 10, 25];
  expect(coinChange(denominations, 1)).toEqual(1);
  expect(coinChange(denominations, 2)).toEqual(1);
  expect(coinChange(denominations, 5)).toEqual(2);
  expect(coinChange(denominations, 10)).toEqual(4);
  expect(coinChange(denominations, 25)).toEqual(13);
  expect(coinChange(denominations, 45)).toEqual(39);
  expect(coinChange(denominations, 100)).toEqual(242);
});
test('coinChange recursive', () => {
  const denominations = [1, 5, 10, 25];
  const { length } = denominations;
  expect(coinChange2(denominations, length, 1)).toEqual(1);
  expect(coinChange2(denominations, length, 2)).toEqual(1);
  expect(coinChange2(denominations, length, 5)).toEqual(2);
  expect(coinChange2(denominations, length, 10)).toEqual(4);
  expect(coinChange2(denominations, length, 25)).toEqual(13);
  expect(coinChange2(denominations, length, 45)).toEqual(39);
  expect(coinChange2(denominations, length, 100)).toEqual(242);
});
