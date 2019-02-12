/*
 * @title: Sleep / Delay
 * @description: wait to execute function with args
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

// npx jest utils/sleep.js
test('urlify()', async () => {
  const sum = (a, b) => a + b;
  const result = await sleep(sum, 1, 2);
  expect(result).toEqual(3);
});
