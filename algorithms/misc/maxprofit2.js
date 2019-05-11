/*
 * @title: MaxProfit2
 * @description: Stocks find max profit to buy & sell
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  Note: only allowed to buy and sell multiple times
  Input: [7,1,5,3,6,4]
  Output: 7
  Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
*/

function maxProfit(arr) {
  let max = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) max += arr[i] - arr[i - 1];
  }

  return max;
}

// npx jest algorithms/misc/maxprofit2.js
test('maxProfit()', () => {
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(7);
});
