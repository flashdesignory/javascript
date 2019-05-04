/*
 * @title: MaxProfit
 * @description: Stocks find max profit to buy & sell
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

/*
  Input: [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
  Not 7-1 = 6, as selling price needs to be larger than buying price.
*/

function maxProfit(arr) {
  let min = Infinity;
  let profit = 0;
  let difference = 0;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (current < min) {
      min = current;
    }

    difference = current - min;
    if (difference > profit) {
      profit = difference;
    }
  }

  return profit;
}

// npx jest algorithms/misc/maxprofit.js
test('maxProfit()', () => {
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(5);
});
